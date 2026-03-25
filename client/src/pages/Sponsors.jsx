import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import './Sponsors.css';

export default function Sponsors() {
  const { data: sponsors, loading, error } = useApi('/api/sponsors');

  const [form, setForm] = useState({
    contactName: '', businessName: '', email: '',
    phone: '', website: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/sponsor-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSubmitted(true);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="sponsors-page">
      <div className="page-header">
        <div className="container">
          <p className="section-label">Community Partners</p>
          <h1>Our <span>Sponsors</span></h1>
        </div>
      </div>

      {/* ── Current Sponsors Grid ── */}
      <section className="section sponsors-section">
        <div className="container">
          <p className="section-label">Proudly Supported By</p>
          <h2 className="section-title">Club <span>Partners</span></h2>
          <div className="gold-divider" />

          {loading && <div className="loading-state"><div className="spinner" /><p>Loading sponsors…</p></div>}
          {error   && <div className="error-state"><p>Failed to load sponsors.</p></div>}

          {!loading && !error && sponsors?.length === 0 && (
            <div className="sponsors-empty">
              <p>Sponsorship opportunities are available. Be the first to partner with the Rifles!</p>
            </div>
          )}

          {sponsors && sponsors.length > 0 && (
            <div className="sponsors-grid">
              {sponsors.map((sponsor, i) => (
                <a
                  key={i}
                  href={sponsor.Website || '#'}
                  target={sponsor.Website ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`sponsor-card ${!sponsor.Website ? 'sponsor-card--no-link' : ''}`}
                >
                  {sponsor.Image ? (
                    <img src={sponsor.Image} alt={sponsor.Name} loading="lazy" />
                  ) : (
                    <div className="sponsor-card__placeholder">
                      <span>{sponsor.Name}</span>
                    </div>
                  )}
                  <p className="sponsor-card__name">{sponsor.Name}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Become a Sponsor ── */}
      <section className="section become-sponsor-section">
        <div className="container">
          <div className="become-sponsor-layout">
            {/* Left info */}
            <div className="become-sponsor-info">
              <p className="section-label">Partnership Opportunities</p>
              <h2>Become a <span>Sponsor</span></h2>
              <div className="gold-divider" />
              <p>
                The Springfield Rifles RFC is always looking for community-minded businesses
                and organizations to partner with. Sponsoring our club is a great way to
                support local rugby, increase your brand visibility, and connect with
                our growing community.
              </p>

              <div className="sponsor-perks">
                <div className="sponsor-perk">
                  <div className="sponsor-perk__icon">🏆</div>
                  <div>
                    <strong>Logo on Club Materials</strong>
                    <p>jerseys, banners, and printed programs</p>
                  </div>
                </div>
                <div className="sponsor-perk">
                  <div className="sponsor-perk__icon">🌐</div>
                  <div>
                    <strong>Website Feature</strong>
                    <p>your logo and link on our sponsors page</p>
                  </div>
                </div>
                <div className="sponsor-perk">
                  <div className="sponsor-perk__icon">📢</div>
                  <div>
                    <strong>Social Media Shoutouts</strong>
                    <p>recognition across our platforms</p>
                  </div>
                </div>
                <div className="sponsor-perk">
                  <div className="sponsor-perk__icon">🏉</div>
                  <div>
                    <strong>Community Impact</strong>
                    <p>directly supporting men's &amp; women's rugby</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="become-sponsor-form-wrapper">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success__icon">✓</div>
                  <h3>Inquiry Sent!</h3>
                  <p>Thank you for your interest in sponsoring the Rifles. Check your inbox — we've sent you a confirmation. A board member will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="sponsor-form">
                  <h3 className="sponsor-form__title">Sponsorship Inquiry</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="contactName">Contact Name *</label>
                      <input id="contactName" name="contactName" type="text" value={form.contactName} onChange={handleChange} placeholder="John Smith" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="businessName">Business / Organization</label>
                      <input id="businessName" name="businessName" type="text" value={form.businessName} onChange={handleChange} placeholder="Acme Co." />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@acme.com" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="website">Business Website</label>
                    <input id="website" name="website" type="url" value={form.website} onChange={handleChange} placeholder="https://www.yourbusiness.com" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your business and what type of sponsorship you're interested in…" rows={4} />
                  </div>

                  {formError && <p className="form-error">{formError}</p>}

                  <button type="submit" className="btn btn-primary sponsor-submit" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Submit Inquiry →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
