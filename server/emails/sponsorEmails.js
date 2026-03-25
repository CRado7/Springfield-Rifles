/**
 * Email templates for sponsor inquiries.
 */

const NAV_LINKS = (siteUrl) => `
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 0 20px;">
        <a href="${siteUrl}/" style="color:#c9a84c;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:0 14px;">Home</a>
        <a href="${siteUrl}/schedule" style="color:#c9a84c;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:0 14px;">Schedule</a>
        <a href="${siteUrl}/team" style="color:#c9a84c;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:0 14px;">Team</a>
        <a href="${siteUrl}/sponsors" style="color:#c9a84c;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:0 14px;">Sponsors</a>
      </td>
    </tr>
  </table>
`;

const EMAIL_WRAPPER = (siteUrl, bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Springfield Rifles RFC — Sponsorship</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- ── TOP NAV BAR ── -->
          <tr>
            <td style="background-color:#111111;border-bottom:1px solid #2a2a2a;padding:14px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:12px;">
                    <span style="font-family:'Arial Black',Arial,sans-serif;font-size:11px;letter-spacing:4px;color:#ffffff;text-transform:uppercase;">SPRINGFIELD&nbsp;</span>
                    <span style="font-family:'Arial Black',Arial,sans-serif;font-size:16px;letter-spacing:3px;color:#c9a84c;text-transform:uppercase;">RIFLES</span>
                    <span style="font-family:'Arial Black',Arial,sans-serif;font-size:10px;letter-spacing:4px;color:#2a7a3e;text-transform:uppercase;">&nbsp;RFC</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="padding:6px 0;border-top:1px solid #2a2a2a;">${NAV_LINKS(siteUrl)}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── HERO IMAGE ── -->
          <tr>
            <td style="padding:0;">
              <img
                src="cid:email-hero"
                alt="Springfield Rifles RFC"
                width="600"
                style="width:100%;max-width:600px;display:block;border:0;"
              />
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,rgba(10,10,10,0) 0%,rgba(10,10,10,0.92) 100%);">
                <tr>
                  <td align="center" style="padding:20px 32px 28px;">
                    <p style="margin:0;font-family:'Arial Black',Arial,sans-serif;font-size:24px;letter-spacing:3px;color:#ffffff;text-transform:uppercase;">SPONSORSHIP INQUIRY</p>
                    <div style="width:50px;height:3px;background:#c9a84c;margin:10px auto 0;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="background:linear-gradient(180deg,#1a2a1a 0%,#0f1a0f 40%,#0a0a0a 100%);padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:40px 40px 48px;">
                    ${bodyContent}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#111111;border-top:3px solid #c9a84c;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-family:'Arial Black',Arial,sans-serif;font-size:13px;letter-spacing:2px;color:#c9a84c;text-transform:uppercase;">Springfield Rifles RFC</p>
              <p style="margin:0 0 16px;font-size:12px;color:#555555;">Men's &amp; Women's Rugby Club</p>
              <p style="margin:0;font-size:11px;color:#444444;">© ${new Date().getFullYear()} Springfield Rifles RFC. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ── Sponsor Applicant Confirmation Email ─────────────────────────────────────

function buildSponsorApplicantEmail({ contactName, businessName, siteUrl }) {
  const body = `
    <p style="margin:0 0 8px;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:3px;color:#2a7a3e;text-transform:uppercase;">Thank You for Your Interest</p>
    <h1 style="margin:0 0 24px;font-family:'Arial Black',Arial,sans-serif;font-size:26px;color:#ffffff;letter-spacing:1px;line-height:1.1;">
      ${contactName},<br/>
      <span style="color:#c9a84c;">You're Making a Difference.</span>
    </h1>
    <div style="width:50px;height:3px;background:#c9a84c;margin-bottom:28px;"></div>

    <p style="margin:0 0 20px;font-size:15px;color:rgba(245,240,232,0.8);line-height:1.8;">
      Thank you for reaching out about sponsoring the <strong style="color:#ffffff;">Springfield Rifles RFC</strong>. 
      We're thrilled that <strong style="color:#c9a84c;">${businessName || 'your organization'}</strong> is interested 
      in partnering with our club — it means a great deal to our players, our families, and our community.
    </p>

    <p style="margin:0 0 20px;font-size:15px;color:rgba(245,240,232,0.8);line-height:1.8;">
      Sponsors like you make it possible for us to keep both our men's and women's teams competing, 
      growing, and welcoming new players every season. Your investment goes directly into the club — 
      from pitch fees and equipment to travel and events.
    </p>

    <!-- Highlight Block -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:rgba(201,168,76,0.08);border-left:3px solid #c9a84c;border-radius:0 4px 4px 0;padding:20px 24px;">
          <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#2a7a3e;text-transform:uppercase;font-weight:bold;">What Happens Next</p>
          <p style="margin:0 0 10px;font-size:14px;color:rgba(245,240,232,0.8);line-height:1.7;">
            A member of our board will be in touch with you shortly to discuss sponsorship tiers, 
            branding opportunities, and how we can best recognize your contribution.
          </p>
          <p style="margin:0;font-size:14px;color:rgba(245,240,232,0.8);line-height:1.7;">
            We look forward to building a partnership that benefits both the Rifles and your business.
          </p>
        </td>
      </tr>
    </table>

    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="background:#c9a84c;border-radius:4px;padding:14px 28px;">
          <a href="${siteUrl}/sponsors" style="color:#0a0a0a;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;">View Current Sponsors →</a>
        </td>
      </tr>
    </table>
  `;

  return EMAIL_WRAPPER(siteUrl, body);
}

// ── Board Sponsor Notification Email ─────────────────────────────────────────

function buildSponsorBoardEmail({ contactName, businessName, email, phone, website, message, siteUrl }) {
  const body = `
    <p style="margin:0 0 8px;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:3px;color:#2a7a3e;text-transform:uppercase;">New Sponsorship Inquiry</p>
    <h1 style="margin:0 0 24px;font-family:'Arial Black',Arial,sans-serif;font-size:24px;color:#ffffff;letter-spacing:1px;">
      Sponsorship Inquiry From <span style="color:#c9a84c;">${businessName || contactName}</span>
    </h1>
    <div style="width:50px;height:3px;background:#c9a84c;margin-bottom:28px;"></div>

    <p style="margin:0 0 24px;font-size:15px;color:rgba(245,240,232,0.8);line-height:1.8;">
      A new sponsorship inquiry was submitted through the Springfield Rifles website.
    </p>

    <!-- Details Table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #2a2a2a;border-radius:6px;overflow:hidden;">
      ${[
        ['Contact Name', contactName],
        ['Business / Organization', businessName || '—'],
        ['Email', `<a href="mailto:${email}" style="color:#c9a84c;">${email}</a>`],
        ['Phone', phone || '—'],
        website ? ['Website', `<a href="${website}" style="color:#c9a84c;">${website}</a>`] : null,
      ].filter(Boolean).map(([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? '#111111' : '#161616'};">
          <td style="padding:12px 16px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888888;width:40%;">${label}</td>
          <td style="padding:12px 16px;font-size:14px;color:#ffffff;">${value}</td>
        </tr>
      `).join('')}
    </table>

    ${message ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:#161616;border:1px solid #2a2a2a;border-radius:6px;padding:20px 24px;">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;color:#888888;text-transform:uppercase;">Their Message</p>
          <p style="margin:0;font-size:14px;color:rgba(245,240,232,0.8);line-height:1.8;">${message}</p>
        </td>
      </tr>
    </table>
    ` : ''}

    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="background:#c9a84c;border-radius:4px;padding:14px 28px;">
          <a href="mailto:${email}" style="color:#0a0a0a;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Reply to ${contactName} →</a>
        </td>
      </tr>
    </table>
  `;

  return EMAIL_WRAPPER(siteUrl, body);
}

module.exports = { buildSponsorApplicantEmail, buildSponsorBoardEmail };
