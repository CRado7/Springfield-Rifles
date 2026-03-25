import { useState } from 'react';
import './Contact.css';

const EXPERIENCE_OPTIONS = [
  { value: '0',   label: 'No experience' },
  { value: '1-3', label: '1–3 years' },
  { value: '4+',  label: '4+ years' },
];
const CONTACT_METHODS = ['Email', 'Phone', 'Text'];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    contactMethod: 'Email', team: '', experience: '0',
    positions: '', about: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const hasExperience = form.experience !== '0';

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="contact-page">
      <div className="page-header">
        <div className="container">
          <p className="section-label">Get In Touch</p>
          <h1>Contact <span>Us</span></h1>
        </div>
      </div>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-info">
            <h2>Join the Rifles</h2>
            <p>
              Whether you're a seasoned player or completely new to rugby, we'd love
              to hear from you. Fill out the form and we'll be in touch to get you
              on the pitch.
            </p>
            <div className="contact-info__items">
              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div>
                  <strong>Men's &amp; Women's Teams</strong>
                  <p>All skill levels welcome</p>
                </div>
              </div>
              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <strong>Regular Practice</strong>
                  <p>Weekly sessions and matches</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. Check your inbox — we've sent you a confirmation email. We'll be in touch soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Jane Smith" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                </div>

                <div className="form-group">
                  <label>Best Way to Contact</label>
                  <div className="radio-group">
                    {CONTACT_METHODS.map((method) => (
                      <label key={method} className="radio-option">
                        <input type="radio" name="contactMethod" value={method} checked={form.contactMethod === method} onChange={handleChange} />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="team" name="team"> Which Team Are You Interested In Joining</label>
                  <select id="team" name="team" value={form.team} onChange={handleChange}>
                    <option value="">Select a team</option>
                    <option value="mens">Men's Team</option>
                    <option value="womens">Women's Team</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Years of Rugby Experience</label>
                  <select id="experience" name="experience" value={form.experience} onChange={handleChange}>
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {hasExperience && (
                  <div className="form-group form-group--animated">
                    <label htmlFor="positions">Position(s) Played</label>
                    <input id="positions" name="positions" type="text" value={form.positions} onChange={handleChange} placeholder="e.g. Fly-half, Prop, Lock…" />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="about">More About Yourself</label>
                  <textarea id="about" name="about" value={form.about} onChange={handleChange} placeholder="Tell us a bit about yourself, your fitness level, what you're looking to get out of rugby…" rows={5} />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn btn-primary contact-submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
