import { useApi } from '../hooks/useApi';
import PlayerCard from '../components/PlayerCard';
import './Team.css';

export default function Team() {
  const { data, loading, error } = useApi('/api/players');

  const mens   = (data || []).filter((p) => p.Team?.toLowerCase() === 'mens');
  const womens = (data || []).filter((p) => p.Team?.toLowerCase() === 'womens');
  const oldBoys = (data || []).filter((p) => p.Team?.toLowerCase() === 'old boys');

  return (
    <main className="team-page">
      <div className="page-header">
        <div className="container">
          <p className="section-label">Springfield Rifles RFC</p>
          <h1>Our <span>Teams</span></h1>
        </div>
      </div>

      {loading && <div className="loading-state section"><div className="spinner" /><p>Loading players…</p></div>}
      {error   && <div className="error-state section"><p>Failed to load players.</p></div>}

      {!loading && !error && (
        <>
          {/* Men's Team */}
          <section className="section team-section">
            <div className="container">
              <div className="team-section__header">
                <span className="badge badge-mens team-badge">Men's</span>
                <h2 className="team-section__title">Men's <span>Team</span></h2>
              </div>
              <div className="gold-divider" />
              {mens.length === 0 ? (
                <p className="team-empty">No men's players listed yet.</p>
              ) : (
                <div className="players-grid">
                  {mens.map((player, i) => (
                    <PlayerCard key={i} player={player} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Women's Team */}
          <section className="section team-section team-section--womens">
            <div className="container">
              <div className="team-section__header">
                <span className="badge badge-womens team-badge">Women's</span>
                <h2 className="team-section__title">Women's <span>Team</span></h2>
              </div>
              <div className="gold-divider" />
              {womens.length === 0 ? (
                <p className="team-empty">No women's players listed yet.</p>
              ) : (
                <div className="players-grid">
                  {womens.map((player, i) => (
                    <PlayerCard key={i} player={player} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/*Old Boy's Team*/}
          <section className="section team-section">
            <div className="container">
              <div className="team-section__header">
                <span className="badge badge-oldboys team-badge">Old Boy's</span>
                <h2 className="team-section__title">Old Boy's <span>Team</span></h2>
              </div>
              <div className="gold-divider" />
              {oldBoys.length === 0 ? (
                <p className="team-empty">No Old Boy's players listed yet.</p>
              ) : (
                <div className="players-grid">
                  {oldBoys.map((player, i) => (
                    <PlayerCard key={i} player={player} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
