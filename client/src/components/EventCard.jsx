import './EventCard.css';

export default function EventCard({ event }) {
  const isHome = String(event.Home).toLowerCase() === 'true' || event.Home === true;
  const typeLabel = event.type === 'mens' ? "Men's" : event.type === 'womens' ? "Women's" : 'Event';

  return (
    <div className={`event-card event-card--${event.type}`}>
      <div className="event-card__header">
        <span className={`badge badge-${event.type}`}>{typeLabel}</span>
        {event.type !== 'event' && (
          <span className={`badge ${isHome ? 'badge-home' : 'badge-away'}`}>
            {isHome ? 'Home' : 'Away'}
          </span>
        )}
      </div>
      <h3 className="event-card__title">
        {event.type === 'event' ? event.Name : `vs ${event.Opponent || 'TBD'}`}
      </h3>
      <div className="event-card__meta">
        {event.Date && (
          <span className="event-card__detail">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {event.Date}
          </span>
        )}
        {event.Time && (
          <span className="event-card__detail">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            {event.Time}
          </span>
        )}
        {event.Location && (
          <span className="event-card__detail">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {event.Location}
          </span>
        )}
      </div>
    </div>
  );
}
