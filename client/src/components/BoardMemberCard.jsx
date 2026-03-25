import './BoardMemberCard.css';

export default function BoardMemberCard({ member }) {
  return (
    <div className="board-card">
      <div className="board-card__photo">
        {member.Picture ? (
          <img src={member.Picture} alt={member.Name} loading="lazy" />
        ) : (
          <div className="board-card__photo-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )}
      </div>
      <div className="board-card__info">
        <h3 className="board-card__name">{member.Name}</h3>
        <p className="board-card__title">{member.Title}</p>
        {member.Email && (
          <button className="btn btn-primary">
            <a href={`mailto:${member.Email}`} className="board-card__email">
              CONTACT
            </a>
          </button>
        )}
      </div>
    </div>
  );
}
