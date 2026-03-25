import { useApi } from '../hooks/useApi';
import BoardMemberCard from '../components/BoardMemberCard';
import './Board.css';

export default function Board() {
  const { data, loading, error } = useApi('/api/board');

  return (
    <main className="board-page">
      <div className="page-header">
        <div className="container">
          <p className="section-label">Leadership</p>
          <h1>Board <span>Members</span></h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading && <div className="loading-state"><div className="spinner" /><p>Loading board members…</p></div>}
          {error   && <div className="error-state"><p>Failed to load board members.</p></div>}

          {!loading && !error && data?.length === 0 && (
            <div className="loading-state"><p>No board members listed yet.</p></div>
          )}

          {data && data.length > 0 && (
            <div className="board-grid">
              {data.map((member, i) => (
                <BoardMemberCard key={i} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
