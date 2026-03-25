require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { buildPlayerApplicantEmail, buildRecruitingChairEmail } = require('./emails/playerEmails');
const { buildSponsorApplicantEmail, buildSponsorBoardEmail } = require('./emails/sponsorEmails');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    `
      default-src 'self';
      script-src 'self';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com data:;
      img-src 'self' data: https:;
      connect-src 'self';
    `.replace(/\n/g, "")
  );
  next();
});

// ── Email Transport ──────────────────────────────────────────────────────────
function createTransport() {
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

const heroAttachment = {
  filename: 'email-hero.jpg',
  path: path.join(__dirname, 'email-assets', 'email-hero.jpg'),
  cid: 'email-hero',
};

// ── Google Auth ──────────────────────────────────────────────────────────────
function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
}

async function getSheetData(range) {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: process.env.SPREADSHEET_ID, range });
  return res.data.values || [];
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDriveUrl(url) {
  if (!url || typeof url !== 'string') return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return `https://lh3.googleusercontent.com/d/${match[1]}`;
  return url;
}

function rowsToObjects(rows) {
  if (!rows || rows.length < 2) return [];
  const [headers, ...data] = rows;
  return data.map((row) =>
    headers.reduce((obj, header, i) => {
      const key = header.trim();
      let value = row[i] ?? '';
      if ((key === 'Picture' || key === 'Image') && value) value = formatDriveUrl(value);
      obj[key] = value;
      return obj;
    }, {})
  );
}

// ── Sheet Routes ─────────────────────────────────────────────────────────────
app.get('/api/mens-matches',   async (_, res) => { try { res.json(rowsToObjects(await getSheetData('MensMatches!A:F'))); } catch(e) { res.status(500).json({error:e.message}); }});
app.get('/api/womens-matches', async (_, res) => { try { res.json(rowsToObjects(await getSheetData('WomensMatches!A:F'))); } catch(e) { res.status(500).json({error:e.message}); }});
app.get('/api/events',         async (_, res) => { try { res.json(rowsToObjects(await getSheetData('Events!A:D'))); } catch(e) { res.status(500).json({error:e.message}); }});
app.get('/api/board',          async (_, res) => { try { res.json(rowsToObjects(await getSheetData('BoardMembers!A:D'))); } catch(e) { res.status(500).json({error:e.message}); }});
app.get('/api/players',        async (_, res) => { try { res.json(rowsToObjects(await getSheetData('Players!A:D'))); } catch(e) { res.status(500).json({error:e.message}); }});
app.get('/api/sponsors',       async (_, res) => { try { res.json(rowsToObjects(await getSheetData('Sponsors!A:C'))); } catch(e) { res.status(500).json({error:e.message}); }});

app.get('/api/schedule', async (_, res) => {
  try {
    const [mensRows, womensRows, eventRows] = await Promise.all([
      getSheetData('MensMatches!A:F'), getSheetData('WomensMatches!A:F'), getSheetData('Events!A:D'),
    ]);
    res.json([
      ...rowsToObjects(mensRows).map(m => ({...m, type:'mens'})),
      ...rowsToObjects(womensRows).map(m => ({...m, type:'womens'})),
      ...rowsToObjects(eventRows).map(e => ({...e, type:'event'})),
    ]);
  } catch(e) { res.status(500).json({error:e.message}); }
});

// ── Contact (Player Inquiry) ──────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, contactMethod, team, experience, positions, about } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });

  const siteUrl = process.env.SITE_URL || process.env.CLIENT_URL || 'http://localhost:5173';
  // const recruitingEmail = process.env.RECRUITING_EMAIL;
  const fromAddress = process.env.EMAIL_FROM || process.env.GMAIL_USER || process.env.SMTP_USER;

  let recruitingEmail;

  if (team === 'mens') {
    recruitingEmail = process.env.MENS_RECRUITING_EMAIL;
  } else if (team === 'womens') {
    recruitingEmail = process.env.WOMENS_RECRUITING_EMAIL;
  }

  try {
    const transport = createTransport();
    await transport.sendMail({
      from: `"Springfield Rifles RFC" <${fromAddress}>`,
      to: email,
      subject: `Welcome to the Rifles, ${name}! 🏉`,
      html: buildPlayerApplicantEmail({ name, experience, positions, siteUrl }),
      attachments: [heroAttachment],
    });
    if (recruitingEmail) {
      await transport.sendMail({
        from: `"Rifles Website" <${fromAddress}>`,
        to: recruitingEmail,
        subject: `New Player Inquiry — ${name}`,
        html: buildRecruitingChairEmail({ name, email, phone, contactMethod, experience, positions, about, siteUrl }),
        attachments: [heroAttachment],
      });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Contact email error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

// ── Sponsor Inquiry ───────────────────────────────────────────────────────────
app.post('/api/sponsor-inquiry', async (req, res) => {
  const { contactName, businessName, email, phone, website, message } = req.body;
  if (!contactName || !email) return res.status(400).json({ error: 'Contact name and email are required.' });

  const siteUrl = process.env.SITE_URL || process.env.CLIENT_URL || 'http://localhost:5173';
  const boardEmail = process.env.BOARD_EMAIL || process.env.RECRUITING_EMAIL;
  const fromAddress = process.env.EMAIL_FROM || process.env.GMAIL_USER || process.env.SMTP_USER;

  try {
    const transport = createTransport();
    await transport.sendMail({
      from: `"Springfield Rifles RFC" <${fromAddress}>`,
      to: email,
      subject: `Thank You for Your Sponsorship Interest — Springfield Rifles RFC`,
      html: buildSponsorApplicantEmail({ contactName, businessName, siteUrl }),
      attachments: [heroAttachment],
    });
    if (boardEmail) {
      await transport.sendMail({
        from: `"Rifles Website" <${fromAddress}>`,
        to: boardEmail,
        subject: `New Sponsorship Inquiry — ${businessName || contactName}`,
        html: buildSponsorBoardEmail({ contactName, businessName, email, phone, website, message, siteUrl }),
        attachments: [heroAttachment],
      });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Sponsor email error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));
const distPath = path.join(__dirname, "../client/dist");

// Serve static frontend assets
app.use(express.static(distPath));

// Fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🏉 Server running on port ${PORT}`);
});
