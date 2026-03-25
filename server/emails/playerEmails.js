/**
 * Email templates for player inquiries.
 * SITE_URL is injected at send-time so links work in both dev and production.
 */

const NAV_LINKS = (siteUrl) => `
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 0 20px;">
        <a href="${siteUrl}/" style="color:#c9a84c;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:0 14px;">Home</a>
        <a href="${siteUrl}/schedule" style="color:#c9a84c;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:0 14px;">Schedule</a>
        <a href="${siteUrl}/team" style="color:#c9a84c;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:0 14px;">Team</a>
        <a href="${siteUrl}/board" style="color:#c9a84c;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:0 14px;">Board</a>
        <a href="${siteUrl}/sponsors" style="color:#c9a84c;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:0 14px;">Sponsors</a>
      </td>
    </tr>
  </table>
`;

const EMAIL_WRAPPER = (siteUrl, heroAlt, bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Springfield Rifles RFC</title>
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
            <td style="padding:0;position:relative;">
              <img
                src="cid:email-hero"
                alt="${heroAlt}"
                width="600"
                style="width:100%;max-width:600px;display:block;border:0;"
              />
              <!-- Hero overlay text -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,rgba(10,10,10,0) 0%,rgba(10,10,10,0.92) 100%);">
                <tr>
                  <td align="center" style="padding:24px 32px 32px;">
                    <p style="margin:0;font-family:'Arial Black',Arial,sans-serif;font-size:28px;letter-spacing:3px;color:#ffffff;text-transform:uppercase;line-height:1.1;">SPRINGFIELD RIFLES RFC</p>
                    <div style="width:50px;height:3px;background:#c9a84c;margin:12px auto 0;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="background:linear-gradient(180deg,#1a2a1a 0%,#0f1a0f 40%,#0a0a0a 100%);padding:0;">
              <!-- Diagonal stripe texture row -->
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

// ── Player Applicant Confirmation Email ──────────────────────────────────────

function buildPlayerApplicantEmail({ name, experience, positions, siteUrl, presidentAlt }) {
  const isNewToRugby = experience === '0';

  const presidentMessage = isNewToRugby
    ? `<p style="margin:0 0 16px;font-size:15px;color:#c9a84c;line-height:1.7;font-style:italic;">
        "Every great Rifle started exactly where you are — with zero experience and a desire to play. 
        Rugby is a sport that builds you up from the ground, and our club is built to make sure you 
        feel confident, supported, and part of the family from day one. We can't wait to meet you."
      </p>`
    : `<p style="margin:0 0 16px;font-size:15px;color:#c9a84c;line-height:1.7;font-style:italic;">
        "Players like you are what make this club competitive and exciting. Your experience as a 
        ${positions || 'rugby player'} will be a genuine asset to our team, and we're confident 
        you'll hit the ground running. We're looking forward to seeing what you bring to the pitch."
      </p>`;

  const experienceBlock = isNewToRugby
    ? `<p style="margin:0 0 20px;font-size:15px;color:rgba(245,240,232,0.8);line-height:1.8;">
        No rugby experience? <strong style="color:#c9a84c;">Perfect.</strong> You're in exactly the right place. 
        Our coaches and players love working with newcomers — we'll teach you everything from the basics 
        of the game to your first tackle and your first try. Rugby is one of the most welcoming sports 
        in the world, and the Springfield Rifles are no exception.
      </p>
      <p style="margin:0 0 20px;font-size:15px;color:rgba(245,240,232,0.8);line-height:1.8;">
        What you <em>do</em> bring — your fitness, your attitude, your willingness to learn — 
        is everything we need. Our recruiting chair will be reaching out shortly to discuss 
        practice times and answer any questions you might have.
      </p>`
    : `<p style="margin:0 0 20px;font-size:15px;color:rgba(245,240,232,0.8);line-height:1.8;">
        With <strong style="color:#c9a84c;">${experience} years of experience</strong> and your background 
        as a <strong style="color:#c9a84c;">${positions || 'rugby player'}</strong>, you're exactly 
        the kind of player we're looking for. The Rifles are always strengthening our roster, 
        and your skill set will make an immediate impact.
      </p>
      <p style="margin:0 0 20px;font-size:15px;color:rgba(245,240,232,0.8);line-height:1.8;">
        Our recruiting chair will be in touch soon to chat about tryouts, practice schedules, 
        and getting you onto the pitch with us.
      </p>`;

  const body = `
    <p style="margin:0 0 8px;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:3px;color:#2a7a3e;text-transform:uppercase;">Welcome to the Family</p>
    <h1 style="margin:0 0 24px;font-family:'Arial Black',Arial,sans-serif;font-size:26px;color:#ffffff;letter-spacing:1px;line-height:1.1;">
      Hey ${name},<br/>
      <span style="color:#c9a84c;">We Got Your Inquiry!</span>
    </h1>
    <div style="width:50px;height:3px;background:#c9a84c;margin-bottom:28px;"></div>

    <p style="margin:0 0 20px;font-size:15px;color:rgba(245,240,232,0.8);line-height:1.8;">
      Thanks for reaching out to the <strong style="color:#ffffff;">Springfield Rifles RFC</strong>. 
      We're fired up that you're interested in joining the club and we'll be getting back to you very soon.
    </p>

    ${experienceBlock}

    <!-- President Message Block -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:rgba(201,168,76,0.08);border-left:3px solid #c9a84c;border-radius:0 4px 4px 0;padding:20px 24px;">
          <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#2a7a3e;text-transform:uppercase;font-weight:bold;">A Message From Our Club President</p>
          ${presidentMessage}
          <div style="display:flex;place-items:center">
            <img
              src="cid:mary-prez"
              alt="${presidentAlt}"
              style="border-radius:50%;width:75px;aspect-ration:1/1;background:url()>
            <p style="margin:0;font-size:13px;color:#888888;">— Mary - Club President of Springfield Rifles RFC</p>
          </div>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 28px;font-size:14px;color:#666666;line-height:1.7;">
      In the meantime, feel free to browse our website — check out the team, 
      see our upcoming match schedule, and get a feel for what we're about.
    </p>

    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="background:#c9a84c;border-radius:4px;padding:14px 28px;">
          <a href="${siteUrl}/schedule" style="color:#0a0a0a;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;">View Our Schedule →</a>
        </td>
      </tr>
    </table>
  `;

  return EMAIL_WRAPPER(siteUrl, 'Springfield Rifles RFC — Rugby Ball', body);
}

// ── Recruiting Chair Notification Email ─────────────────────────────────────

function buildRecruitingChairEmail({ name, email, phone, contactMethod, experience, positions, about, siteUrl }) {
  const expLabel = experience === '0' ? 'No experience' : `${experience} years`;

  const body = `
    <p style="margin:0 0 8px;font-family:'Arial Black',Arial,sans-serif;font-size:12px;letter-spacing:3px;color:#2a7a3e;text-transform:uppercase;">New Player Inquiry</p>
    <h1 style="margin:0 0 24px;font-family:'Arial Black',Arial,sans-serif;font-size:24px;color:#ffffff;letter-spacing:1px;">
      New Inquiry From <span style="color:#c9a84c;">${name}</span>
    </h1>
    <div style="width:50px;height:3px;background:#c9a84c;margin-bottom:28px;"></div>

    <p style="margin:0 0 24px;font-size:15px;color:rgba(245,240,232,0.8);line-height:1.8;">
      A new player has submitted an inquiry through the Springfield Rifles website. Their details are below.
    </p>

    <!-- Details Table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #2a2a2a;border-radius:6px;overflow:hidden;">
      ${[
        ['Full Name', name],
        ['Email', `<a href="mailto:${email}" style="color:#c9a84c;">${email}</a>`],
        ['Phone', phone || '—'],
        ['Best Contact Method', contactMethod],
        ['Experience', expLabel],
        positions ? ['Position(s)', positions] : null,
      ].filter(Boolean).map(([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? '#111111' : '#161616'};">
          <td style="padding:12px 16px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#888888;width:40%;">${label}</td>
          <td style="padding:12px 16px;font-size:14px;color:#ffffff;">${value}</td>
        </tr>
      `).join('')}
    </table>

    ${about ? `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:#161616;border:1px solid #2a2a2a;border-radius:6px;padding:20px 24px;">
          <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;color:#888888;text-transform:uppercase;">About Themselves</p>
          <p style="margin:0;font-size:14px;color:rgba(245,240,232,0.8);line-height:1.8;">${about}</p>
        </td>
      </tr>
    </table>
    ` : ''}

    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="background:#c9a84c;border-radius:4px;padding:14px 28px;">
          <a href="mailto:${email}" style="color:#0a0a0a;text-decoration:none;font-family:'Arial Black',Arial,sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Reply to ${name} →</a>
        </td>
      </tr>
    </table>
  `;

  return EMAIL_WRAPPER(siteUrl, 'New Player Inquiry', body);
}

module.exports = { buildPlayerApplicantEmail, buildRecruitingChairEmail };
