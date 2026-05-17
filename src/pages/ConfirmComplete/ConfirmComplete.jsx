import { useNavigate, useLocation } from "react-router-dom";
import "./ConfirmComplete.scss";

const BADGE_LABELS = {
  'QUALITY PICK': '퀄리티 높은 음식점',
  'BALANCE PICK': '균형잡힌 음식점',
  'VALUE PICK':   '가성비 좋은 음식점',
};

export default function ConfirmComplete() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;

  if (!restaurant) return null;

  const badgeLabel = BADGE_LABELS[restaurant.badge] ?? restaurant.badge;

  return (
    <div className="cc-page">
      <header className="cc-header">
        <button className="cc-back-btn" onClick={() => navigate(-1)}>
          <img src="/icons/back.svg" alt="뒤로" />
        </button>
        <span className="cc-logo">Choice Eat</span>
        <div className="cc-header-right">
        </div>
      </header>

      <div className="cc-body">
        <div className="cc-check-wrap">
          <div className="cc-check-circle">✓</div>
        </div>

        <div className="cc-char">
          <img src="/char-smile.png" alt="" />
        </div>

        <p className="cc-title">선택이 완료되었어요!</p>

        <div className="cc-card">
          <p className="cc-card__badge">{badgeLabel}</p>
          <p className="cc-card__name">{restaurant.name}</p>
          <div className="cc-card__info">
            <p className="cc-card__meta">
              {restaurant.category} • {restaurant.distanceKm}km
            </p>
            <p className="cc-card__sub">영업시간: {restaurant.hours}</p>
            <p className="cc-card__sub">전화: {restaurant.phone}</p>
          </div>
          <div className="cc-card__actions">
            <button className="cc-card__action-btn" aria-label="공유">
              <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
                <circle cx="10.5" cy="2.5" r="2" stroke="#7a9e95" strokeWidth="1.2"/>
                <circle cx="10.5" cy="12.5" r="2" stroke="#7a9e95" strokeWidth="1.2"/>
                <circle cx="2.5" cy="7.5" r="2" stroke="#7a9e95" strokeWidth="1.2"/>
                <line x1="8.57" y1="3.54" x2="4.43" y2="6.46" stroke="#7a9e95" strokeWidth="1.2"/>
                <line x1="4.43" y1="8.54" x2="8.57" y2="11.46" stroke="#7a9e95" strokeWidth="1.2"/>
              </svg>
            </button>
            <button className="cc-card__action-btn" aria-label="복사">
              <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
                <rect x="4" y="4" width="10" height="12" rx="2" stroke="#7a9e95" strokeWidth="1.2"/>
                <path d="M2 12V2.5C2 1.67 2.67 1 3.5 1H11" stroke="#7a9e95" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="cc-footer">
        <button className="cc-home-btn" onClick={() => navigate("/")}>
          처음으로
        </button>
      </div>
    </div>
  );
}
