import { useApi } from '../hooks/useApi';
import BoardMemberCard from '../components/BoardMemberCard';
import './Board.css';

export default function Board() {
  const { data, loading, error } = useApi('/api/board');

  const executiveBoard = (data || []).filter((m) => m.Role?.toLowerCase() === 'executive');
  const mensBoard      = (data || []).filter((m) => m.Role?.toLowerCase() === 'mens');
  const womensBoard    = (data || []).filter((m) => m.Role?.toLowerCase() === 'womens');
  const oldboysBoard   = (data || []).filter((m) => m.Role?.toLowerCase() === 'old boys');

  return (
    <main className="board-page">
      <div className="page-header">
        <div className="container">
          <p className="section-label">Leadership</p>
          <h1>Board <span>Members</span></h1>
        </div>
      </div>

      {loading && <div className="loading-state section"><div className="spinner" /><p>Loading board members…</p></div>}
      {error   && <div className="error-state section"><p>Failed to load board members.</p></div>}

      {!loading && !error && data?.length === 0 && (
        <div className="loading-state section"><p>No board members listed yet.</p></div>
      )}

      {!loading && !error && data && data.length > 0 && (
        <>
          {/* Executive Board */}
          {executiveBoard.length > 0 && (
            <section className="section team-section">
              <div className="container">
                <div className="team-section__header">
                  <span className="badge badge-executive team-badge">Executive</span>
                  <h2 className="team-section__title">Executive <span>Board</span></h2>
                </div>
                <div className="gold-divider" />
                <div className="players-grid">
                  {executiveBoard.map((member, i) => (
                    <BoardMemberCard key={i} member={member} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Men's Board */}
          {mensBoard.length > 0 && (
            <section className="section team-section team-section--womens">
              <div className="container">
                <div className="team-section__header">
                  <span className="badge badge-mens team-badge">Men's</span>
                  <h2 className="team-section__title">Men's <span>Board</span></h2>
                </div>
                <div className="gold-divider" />
                <div className="players-grid">
                  {mensBoard.map((member, i) => (
                    <BoardMemberCard key={i} member={member} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Women's Board */}
          {womensBoard.length > 0 && (
            <section className="section team-section">
              <div className="container">
                <div className="team-section__header">
                  <span className="badge badge-womens team-badge">Women's</span>
                  <h2 className="team-section__title">Women's <span>Board</span></h2>
                </div>
                <div className="gold-divider" />
                <div className="players-grid">
                  {womensBoard.map((member, i) => (
                    <BoardMemberCard key={i} member={member} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Old Boys Board */}
          {oldboysBoard.length > 0 && (
            <section className="section team-section team-section--womens">
              <div className="container">
                <div className="team-section__header">
                  <span className="badge badge-oldboys team-badge">Old Boys</span>
                  <h2 className="team-section__title">Rusty Muskets <span>Board</span></h2>
                </div>
                <div className="gold-divider" />
                <div className="players-grid">
                  {oldboysBoard.map((member, i) => (
                    <BoardMemberCard key={i} member={member} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}