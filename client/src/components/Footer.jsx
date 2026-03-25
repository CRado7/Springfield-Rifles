import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__stripe" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span>SPRINGFIELD</span>
            <span className="gold">RIFLES</span>
            <span className="green">RFC</span>
          </div>
          <p className="footer__tagline">Est. Men's & Women's Rugby Club</p>
        </div>

        <nav className="footer__nav">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/board">Board</Link></li>
            <li><Link to="/sponsors">Sponsors</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="footer__contact">
          <h4>Get Involved</h4>
          <p>Interested in joining?</p>
          <Link to="/contact" className="btn btn-outline" style={{ marginTop: '12px' }}>
            Contact Us
          </Link>
          <div style={{ marginTop: '16px' }}>
            <p>Want to sponsor us?</p>
            <Link to="/sponsors" className="btn btn-ghost" style={{ marginTop: '8px' }}>
              Become a Sponsor
            </Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Springfield Rifles RFC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
