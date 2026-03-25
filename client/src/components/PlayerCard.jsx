import './PlayerCard.css';

export default function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <div className="player-card__photo">
        {player.Picture ? (
          <img src={player.Picture} alt={player.Name} loading="lazy" />
        ) : (
          <div className="player-card__photo-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )}
      </div>
      <div className="player-card__info">
        <h3 className="player-card__name">{player.Name}</h3>
        <p className="player-card__position">{player.Position}</p>
      </div>
    </div>
  );
}
