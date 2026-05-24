import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ConfirmComplete.module.scss";
import { BADGE_LABELS } from "../../data/constants";

export default function ConfirmComplete() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;

  if (!restaurant) return null;

  const badgeLabel = BADGE_LABELS[restaurant.badge] ?? restaurant.badge;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <img src="/icons/back.svg" alt="뒤로" />
        </button>
        <span className={styles.logo}>Choice Eat</span>
        <div className={styles.headerRight}></div>
      </header>

      <div className={styles.body}>
        <div className={styles.checkWrap}>
          <img
            src="/icons/check-default.svg"
            alt="완료"
            className={styles.checkIcon}
          />
        </div>

        <div className={styles.char}>
          <img src="/char-smile.png" alt="" />
        </div>

        <p className={styles.title}>선택이 완료되었어요!</p>

        <div className={styles.card}>
          <p className={styles.cardBadge}>{badgeLabel}</p>
          <p className={styles.cardName}>{restaurant.name}</p>
          <div className={styles.cardInfo}>
            <p className={styles.cardMeta}>
              {restaurant.category} • {restaurant.distanceKm}km
            </p>
            <p className={styles.cardSub}>영업시간: {restaurant.hours}</p>
            <p className={styles.cardSub}>전화: {restaurant.phone}</p>
          </div>
          <div className={styles.cardActions}>
            <button className={styles.cardActionBtn} aria-label="공유">
              <img src="/icons/share.svg" alt="공유" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.homeBtn} onClick={() => navigate("/home")}>
          처음으로
        </button>
      </div>
    </div>
  );
}
