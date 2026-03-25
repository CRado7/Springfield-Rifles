import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import EventCard from '../components/EventCard';
import './Home.css';

// Returns events within the next 7 days from a combined schedule array
function getUpcomingWeek(items) {
  if (!items) return [];
  const now = new Date();
  const weekOut = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  return items.filter((item) => {
    const date = new Date(item.Date);
    return !isNaN(date) && date >= now && date <= weekOut;
  });
}

export default function Home() {
  const { data: schedule, loading } = useApi('/api/schedule');
  const upcomingEvents = getUpcomingWeek(schedule);

  return (
    <main className="home">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <p className="hero__eyebrow">Springfield Rifles RFC</p>
          <h1 className="hero__title">
            Play Hard.<br />
            <span>Run Fast.</span><br />
            Win Together.
          </h1>
          <p className="hero__subtitle">
            Men's and women's rugby for all skill levels. Join our community and find your game.
          </p>
          <div className="hero__actions">
            <Link to="/contact" className="btn btn-primary hero__cta">
              Join Today
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/schedule" className="btn btn-ghost">View Schedule</Link>
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <span />
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-text">
            <p className="section-label">About the Club</p>
            <h2 className="section-title">More Than a <span>Rugby Club</span></h2>
            <div className="gold-divider" />
            <p>
              The Springfield Rifles RFC is a community-first rugby club with competitive
              men's and women's teams. Whether you're a seasoned veteran or have never
              touched a ball, we believe rugby belongs to everyone.
            </p>
            <p>
              Founded on principles of respect, teamwork, and dedication, we compete in
              local and regional leagues while maintaining a welcoming environment for
              newcomers and families alike.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <span className="about-stat__num">2</span>
                <span className="about-stat__label">Teams</span>
              </div>
              <div className="about-stat">
                <span className="about-stat__num">50+</span>
                <span className="about-stat__label">Players</span>
              </div>
              <div className="about-stat">
                <span className="about-stat__num">All</span>
                <span className="about-stat__label">Skill Levels</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-image__frame">
              <div className="about-image__placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <ellipse cx="12" cy="12" rx="5" ry="8" transform="rotate(-30 12 12)" />
                  <line x1="7" y1="9" x2="17" y2="9" /><line x1="7" y1="15" x2="17" y2="15" />
                </svg>
                <p>Club Photo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ──────────────────────────────────────────────── */}
      <section className="section upcoming-section">
        <div className="container">
          <p className="section-label">This Week</p>
          <h2 className="section-title">Upcoming <span>Events</span></h2>
          <div className="gold-divider" />

          {loading ? (
            <div className="loading-state"><div className="spinner" /><p>Loading events…</p></div>
          ) : upcomingEvents.length === 0 ? (
            <div className="no-events">
              <p>No events this week. Check the full <Link to="/schedule">schedule</Link>.</p>
            </div>
          ) : (
            <div className="upcoming-grid">
              {upcomingEvents.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          )}

          <div className="upcoming-footer">
            <Link to="/schedule" className="btn btn-outline">
              Full Schedule →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────────────── */}
      <section className="section contact-cta-section">
        <div className="container">
          <div className="contact-cta">
            <div className="contact-cta__text">
              <h2>Ready to Get on the Pitch?</h2>
              <p>Reach out to us and we'll get you connected with the right team.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">
              Contact Us Today →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
