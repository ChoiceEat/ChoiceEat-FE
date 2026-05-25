import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { RESTAURANTS } from "../../data/restaurants";
import styles from "./PickList.module.scss";

const PICKS = [
  { key: "balance", label: "밸런스 픽", icon: "/icons/pick-balance.svg" },
  { key: "value", label: "가성비 픽", icon: "/icons/pick-value.svg" },
  { key: "quality", label: "퀄리티 픽", icon: "/icons/pick-quality.svg" },
];

export default function PickList() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSelect = (key) => {
    navigate("/result", { state: { selectedType: key } });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Choice Eat</h1>
      </header>

      <div className={styles.bubbleRow}>
        <div className={styles.bubble}>
          <p className={styles.bubbleText}>
            {user?.nickname ?? "OO"}님, 이 중에 마음에 드는게 있을까요?
          </p>
        </div>
        <img src="/char-vibe.svg" alt="" className={styles.char} />
      </div>

      <div className={styles.list}>
        {PICKS.map(({ key, label, icon }) => {
          const restaurant = RESTAURANTS[key];
          return (
            <button
              key={key}
              className={styles.card}
              onClick={() => handleSelect(key)}
            >
              <img
                src={restaurant.image || "/empty-store2.svg"}
                alt={restaurant.name}
                className={styles.cardImg}
                onError={(e) => {
                  e.currentTarget.src = "/empty-store2.svg";
                }}
              />
              <div className={styles.overlay} />
              <div className={styles.cardInfo}>
                <img src={icon} alt="" className={styles.pickIcon} />
                <div className={styles.cardTexts}>
                  <p className={styles.cardName}>{restaurant.name}</p>
                  <p className={styles.cardLabel}>{label}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
