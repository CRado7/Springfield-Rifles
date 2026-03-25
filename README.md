# Springfield Rifles RFC — Website

Full-stack website for the Springfield Rifles Rugby Club. Built with **Vite/React** (frontend) and **Node/Express** (backend), with content managed via **Google Sheets** and automated emails via **Nodemailer**.

---

## Project Structure

```
springfield-rifles-website/
├── client/                        # Vite + React frontend
│   └── src/
│       ├── components/            # Navbar, Footer, cards, Modal
│       ├── pages/                 # Home, Schedule, Team, Board, Sponsors, Contact
│       ├── hooks/useApi.js        # Data-fetching hook
│       └── styles/global.css     # Design system (gold/green/black)
├── server/
│   ├── index.js                   # Express API + email endpoints
│   ├── email-assets/
│   │   └── email-hero.jpg         # Hero image embedded in emails
│   ├── emails/
│   │   ├── playerEmails.js        # Player inquiry templates
│   │   └── sponsorEmails.js       # Sponsor inquiry templates
│   └── .env.example               # All environment variables
└── package.json                   # Root scripts
```

---

## Quick Start

```bash
npm run install:all    # install all deps (root + client + server)
cp server/.env.example server/.env
# Edit server/.env with your credentials
npm run dev            # starts frontend :5173 and backend :3001
```

---

## Google Sheets Setup

### Sheet Tab Names & Columns

| Sheet Name      | Columns                                        |
|-----------------|------------------------------------------------|
| `MensMatches`   | Date, Time, Location, Opponent, Home           |
| `WomensMatches` | Date, Time, Location, Opponent, Home           |
| `Events`        | Name, Date, Time, Location                     |
| `BoardMembers`  | Name, Title, Email, Picture                    |
| `Players`       | Name, Position, Team, Picture                  |
| `Sponsors`      | Name, Image, Website                           |

> - `Home` column: `TRUE` / `FALSE`
> - `Team` column: `Mens` or `Womens`
> - `Date` column: `YYYY-MM-DD` format
> - Image/Picture columns: Google Drive share URL (see below)

### Getting Google Drive Image URLs

1. Upload image to Google Drive
2. Right-click → Share → "Anyone with the link" → Viewer
3. Copy File ID from URL: `https://drive.google.com/file/d/[FILE_ID]/view`
4. Paste the full share URL in the sheet — the server converts it automatically

### Service Account Setup

1. Google Cloud Console → Create Project → Enable **Google Sheets API**
2. APIs & Services → Credentials → Service Account → create → download JSON key
3. Share your spreadsheet with the service account email (Viewer)
4. Add `client_email` and `private_key` from the JSON to `.env`

---

## Email Configuration

Two options — set one in `server/.env`:

### Option A: Gmail
Generate an **App Password** at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) (requires 2FA).

```env
GMAIL_USER=yourclub@gmail.com
GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

### Option B: HawkHost / Domain Email (cPanel SMTP)
Comment out the Gmail vars and set these:

```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_password
```

### Email Recipients

```env
RECRUITING_EMAIL=recruiting@springfieldrifles.com  # receives player inquiry notifications
BOARD_EMAIL=board@springfieldrifles.com            # receives sponsor inquiry notifications
EMAIL_FROM=noreply@springfieldrifles.com           # "from" address on outgoing emails
SITE_URL=https://www.springfieldrifles.com         # used for links in emails (change for prod)
```

---

## API Endpoints

| Method | Path                    | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/api/schedule`         | Combined matches + events            |
| GET    | `/api/mens-matches`     | Men's matches                        |
| GET    | `/api/womens-matches`   | Women's matches                      |
| GET    | `/api/events`           | Social events                        |
| GET    | `/api/board`            | Board members                        |
| GET    | `/api/players`          | All players                          |
| GET    | `/api/sponsors`         | Sponsors                             |
| POST   | `/api/contact`          | Player inquiry → sends two emails    |
| POST   | `/api/sponsor-inquiry`  | Sponsor inquiry → sends two emails   |
| GET    | `/api/health`           | Health check                         |

---

## Email Behavior

### Player Inquiry (`POST /api/contact`)
1. **Applicant receives** a branded confirmation email with a dynamic message:
   - **No experience** → welcoming message explaining that's totally fine, plus a supportive note from the Club President
   - **Has experience** → message celebrating their listed position(s) as an asset, plus the President's note
2. **Recruiting Chair receives** a notification with all form details and a reply button

### Sponsor Inquiry (`POST /api/sponsor-inquiry`)
1. **Sponsor receives** a thank-you email with next steps
2. **Board receives** a notification with all contact details and a reply button

---

## Pages

| Page       | Route        | Notes                                          |
|------------|--------------|------------------------------------------------|
| Home       | `/`          | Hero, About, this week's events, contact CTA   |
| Schedule   | `/schedule`  | Filterable list with event detail modal        |
| Team       | `/team`      | Men's and women's split                        |
| Board      | `/board`     | Board member cards                             |
| Sponsors   | `/sponsors`  | Sponsor logos + become-a-sponsor form          |
| Contact    | `/contact`   | Player inquiry form                            |

---

## Production Deployment

```bash
npm run build       # builds client to client/dist/
```

- Deploy `client/dist/` → Vercel, Netlify, or any static host
- Deploy `server/` → Railway, Render, Fly.io, or your HawkHost Node environment
- Update `SITE_URL` and `CLIENT_URL` in `.env` to production URLs
