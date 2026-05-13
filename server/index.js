require('dotenv').config();
// require('fs').writeFileSync('/home/springf5/repositories/Springfield-Rifles/server/passenger_start.log', new Date().toISOString() + '\n');
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { buildPlayerApplicantEmail, buildRecruitingChairEmail } = require('./emails/playerEmails');
const { buildSponsorApplicantEmail, buildSponsorBoardEmail }   = require('./emails/sponsorEmails');

// ── App Setup ────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'https://www.springfieldriflesrugby.com',
  'https://springfieldriflesrugby.com',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ── Email Transport ──────────────────────────────────────────────────────────
function createTransport() {
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const heroAttachment = {
  filename: 'email-hero.jpg',
  path: path.join(__dirname, 'email-assets', 'email-hero.jpg'),
  cid: 'email-hero',
};

// ── Google Sheets ────────────────────────────────────────────────────────────
function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key:   (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

async function getSheetData(range) {
  const auth   = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const res    = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range,
  });
  return res.data.values || [];
}

function formatDriveUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('drive.google.com')) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `/api/proxy/image?id=${match[1]}`;
  }
  return url;
}

function rowsToObjects(rows) {
  if (!rows || rows.length < 2) return [];
  const [headers, ...data] = rows;
  return data.map((row) =>
    headers.reduce((obj, header, i) => {
      const key   = header.trim();
      let   value = row[i] ?? '';
      if ((key === 'Picture' || key === 'Image') && value) {
        value = formatDriveUrl(value);
      }
      obj[key] = value;
      return obj;
    }, {})
  );
}

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok', port: PORT }));

// ── Sheet Routes ─────────────────────────────────────────────────────────────
app.get('/api/mens-matches', async (_, res) => {
  try { res.json(rowsToObjects(await getSheetData('MensMatches!A:F'))); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/womens-matches', async (_, res) => {
  try { res.json(rowsToObjects(await getSheetData('WomensMatches!A:F'))); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/events', async (_, res) => {
  try { res.json(rowsToObjects(await getSheetData('Events!A:D'))); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/board', async (_, res) => {
  try { res.json(rowsToObjects(await getSheetData('BoardMembers!A:D'))); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/players', async (_, res) => {
  try { res.json(rowsToObjects(await getSheetData('Players!A:D'))); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/sponsors', async (_, res) => {
  try { res.json(rowsToObjects(await getSheetData('Sponsors!A:C'))); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/schedule', async (_, res) => {
  try {
    const [mensRows, womensRows, eventRows] = await Promise.all([
      getSheetData('MensMatches!A:F'),
      getSheetData('WomensMatches!A:F'),
      getSheetData('Events!A:D'),
    ]);
    res.json([
      ...rowsToObjects(mensRows).map(m  => ({ ...m,  type: 'mens'   })),
      ...rowsToObjects(womensRows).map(m => ({ ...m,  type: 'womens' })),
      ...rowsToObjects(eventRows).map(e  => ({ ...e,  type: 'event'  })),
    ]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── Contact — Player Inquiry ──────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, contactMethod, team, experience, positions, about } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const siteUrl     = process.env.SITE_URL || 'https://www.springfieldriflesrugby.com';
  const fromAddress = process.env.EMAIL_FROM || process.env.GMAIL_USER || process.env.SMTP_USER;

  const recruitingEmail = team === 'mens'
    ? process.env.MENS_RECRUITING_EMAIL
    : team === 'womens'
    ? process.env.WOMENS_RECRUITING_EMAIL
    : null;

  try {
    const transport = createTransport();

    await transport.sendMail({
      from:        `"Springfield Rifles RFC" <${fromAddress}>`,
      to:          email,
      subject:     `Welcome to the Rifles, ${name}! 🏉`,
      html:        buildPlayerApplicantEmail({ name, experience, positions, siteUrl }),
      attachments: [heroAttachment],
    });

    if (recruitingEmail) {
      await transport.sendMail({
        from:        `"Rifles Website" <${fromAddress}>`,
        to:          recruitingEmail,
        subject:     `New Player Inquiry — ${name}`,
        html:        buildRecruitingChairEmail({ name, email, phone, contactMethod, experience, positions, about, siteUrl }),
        attachments: [heroAttachment],
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

// ── Contact — Sponsor Inquiry ─────────────────────────────────────────────────
app.post('/api/sponsor-inquiry', async (req, res) => {
  const { contactName, businessName, email, phone, website, message } = req.body;

  if (!contactName || !email) {
    return res.status(400).json({ error: 'Contact name and email are required.' });
  }

  const siteUrl     = process.env.SITE_URL || 'https://www.springfieldriflesrugby.com';
  const fromAddress = process.env.EMAIL_FROM || process.env.GMAIL_USER || process.env.SMTP_USER;
  const boardEmail  = process.env.BOARD_EMAIL;

  try {
    const transport = createTransport();

    await transport.sendMail({
      from:        `"Springfield Rifles RFC" <${fromAddress}>`,
      to:          email,
      subject:     `Thank You for Your Sponsorship Interest — Springfield Rifles RFC`,
      html:        buildSponsorApplicantEmail({ contactName, businessName, siteUrl }),
      attachments: [heroAttachment],
    });

    if (boardEmail) {
      await transport.sendMail({
        from:        `"Rifles Website" <${fromAddress}>`,
        to:          boardEmail,
        subject:     `New Sponsorship Inquiry — ${businessName || contactName}`,
        html:        buildSponsorBoardEmail({ contactName, businessName, email, phone, website, message, siteUrl }),
        attachments: [heroAttachment],
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Sponsor email error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

// ── Image Proxy (Google Drive) ────────────────────────────────────────────────
const imageCache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

app.get('/api/proxy/image', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).send('Missing id');

  // Serve from cache if available
  const cached = imageCache.get(id);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    res.setHeader('Content-Type', cached.contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(cached.buffer);
  }

  try {
    const imageUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch image');
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = Buffer.from(await response.arrayBuffer());

    // Cache for next request
    imageCache.set(id, { buffer, contentType, timestamp: Date.now() });

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(buffer);
  } catch (err) {
    console.error('Image proxy error:', err.message);
    res.status(500).send('Image fetch failed');
  }
});

// ── Static Frontend (fallback — primary serving is via public_html) ───────────
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏉 Server running on port ${PORT}`);
});

process.on('uncaughtException',  (err) => console.error('Uncaught Exception:',  err));
process.on('unhandledRejection', (err) => console.error('Unhandled Rejection:', err));