import { useNavigate, useLocation } from "react-router-dom";
import "./ConfirmComplete.scss";

const BADGE_LABELS = {
  "QUALITY PICK": "퀄리티 높은 음식점",
  "BALANCE PICK": "균형잡힌 음식점",
  "VALUE PICK": "가성비 좋은 음식점",
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
        <div className="cc-header-right"></div>
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
              <img src="/icons/share.svg" alt="공유" />
            </button>
          </div>
        </div>
      </div>

      <div className="cc-footer">
        <button className="cc-home-btn" onClick={() => navigate("home")}>
          처음으로
        </button>
      </div>
    </div>
  );
}
