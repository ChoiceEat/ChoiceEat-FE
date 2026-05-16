import { useNavigate } from "react-router-dom";
import { RESTAURANTS } from "../../data/restaurants";
import styles from "./PickList.module.scss";

const PICKS = [
  { key: "balance", label: "밸런스 픽", icon: "⚖️" },
  { key: "value", label: "가성비 픽", icon: "💰" },
  { key: "quality", label: "퀄리티 픽", icon: "🎁" },
];

export default function PickList() {
  const navigate = useNavigate();

  const handleSelect = (key) => {
    navigate("/result", { state: { selectedType: key } });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Choice Eat</h1>
      </header>

      <div className={styles.bubble}>
        <p className={styles.bubbleText}>이 중에 마음에 드는게 있을까요?</p>
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
                src={restaurant.image}
                alt={restaurant.name}
                className={styles.cardImg}
              />
              <div className={styles.overlay} />
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>{icon}</span>
                <span className={styles.badgeLabel}>{label}</span>
              </div>
              <div className={styles.cardInfo}>
                <p className={styles.cardName}>{restaurant.name}</p>
                <p className={styles.cardMeta}>
                  {restaurant.rating} · {restaurant.category}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
