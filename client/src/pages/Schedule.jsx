import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import Modal from '../components/Modal';
import './Schedule.css';

const FILTERS = [
  { value: 'all', label: 'All Events' },
  { value: 'mens', label: "Men's" },
  { value: 'womens', label: "Women's" },
  { value: 'event', label: 'Social Events' },
];

export default function Schedule() {
  const { data, loading, error } = useApi('/api/schedule');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = (data || []).filter(
    (item) => filter === 'all' || item.type === filter
  );

  // Sort by date
  const sorted = [...filtered].sort((a, b) => new Date(a.Date) - new Date(b.Date));

  // Group by month
  const grouped = sorted.reduce((acc, item) => {
    const date = new Date(item.Date);
    const key = isNaN(date) ? 'TBD' : date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const isHome = (item) => String(item.Home).toLowerCase() === 'true' || item.Home === true;

  return (
    <main className="schedule-page">
      <div className="page-header">
        <div className="container">
          <p className="section-label">Springfield Rifles RFC</p>
          <h1>Match <span>Schedule</span></h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div className="schedule-filters">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`filter-btn ${filter === f.value ? 'filter-btn--active' : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading && <div className="loading-state"><div className="spinner" /><p>Loading schedule…</p></div>}
          {error  && <div className="error-state"><p>Failed to load schedule. Please try again.</p></div>}

          {!loading && !error && sorted.length === 0 && (
            <div className="loading-state"><p>No events found.</p></div>
          )}

          {/* Calendar groups */}
          {Object.entries(grouped).map(([month, items]) => (
            <div key={month} className="schedule-month">
              <h3 className="schedule-month__label">{month}</h3>
              <div className="schedule-list">
                {items.map((item, i) => (
                  <button
                    key={i}
                    className={`schedule-row schedule-row--${item.type}`}
                    onClick={() => setSelected(item)}
                  >
                    <div className="schedule-row__date">
                      {item.Date ? (
                        <>
                          <span className="schedule-row__day">
                            {new Date(item.Date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className="schedule-row__num">
                            {new Date(item.Date).getDate()}
                          </span>
                        </>
                      ) : <span className="schedule-row__day">TBD</span>}
                    </div>

                    <div className="schedule-row__info">
                      <div className="schedule-row__badges">
                        <span className={`badge badge-${item.type}`}>
                          {item.type === 'mens' ? "Men's" : item.type === 'womens' ? "Women's" : 'Event'}
                        </span>
                        {item.type !== 'event' && (
                          <span className={`badge ${isHome(item) ? 'badge-home' : 'badge-away'}`}>
                            {isHome(item) ? 'Home' : 'Away'}
                          </span>
                        )}
                      </div>
                      <p className="schedule-row__title">
                        {item.type === 'event' ? item.Name : `vs ${item.Opponent || 'TBD'}`}
                      </p>
                      <p className="schedule-row__sub">{item.Location}</p>
                    </div>

                    <div className="schedule-row__time">{item.Time || '—'}</div>
                    <div className="schedule-row__arrow">›</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="event-detail">
            <div className="event-detail__badges">
              <span className={`badge badge-${selected.type}`}>
                {selected.type === 'mens' ? "Men's Match" : selected.type === 'womens' ? "Women's Match" : 'Social Event'}
              </span>
              {selected.type !== 'event' && (
                <span className={`badge ${isHome(selected) ? 'badge-home' : 'badge-away'}`}>
                  {isHome(selected) ? 'Home' : 'Away'}
                </span>
              )}
            </div>
            <h2 className="event-detail__title">
              {selected.type === 'event' ? selected.Name : `vs ${selected.Opponent || 'TBD'}`}
            </h2>
            <div className="event-detail__fields">
              {selected.Date && (
                <div className="event-detail__field">
                  <span className="event-detail__field-label">Date</span>
                  <span>{new Date(selected.Date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
              {selected.Time && (
                <div className="event-detail__field">
                  <span className="event-detail__field-label">Time</span>
                  <span>{selected.Time}</span>
                </div>
              )}
              {selected.Location && (
                <div className="event-detail__field">
                  <span className="event-detail__field-label">Location</span>
                  <span>{selected.Location}</span>
                </div>
              )}
              {selected.Opponent && (
                <div className="event-detail__field">
                  <span className="event-detail__field-label">Opponent</span>
                  <span>{selected.Opponent}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
