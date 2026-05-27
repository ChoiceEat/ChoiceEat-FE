import { useNavigate } from "react-router-dom";
import styles from "./MenuHistory.module.scss";
import BottomNav from "../../components/BottomNav/BottomNav";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "../../hooks/useHistory";

export default function MenuHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const nickname = user?.nickname ?? "멋사";

  const { list } = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <img src="/icons/back.png" alt="뒤로" />
          </button>
          <h1 className={styles.title}>
            <span className={styles.titleGreen}>{nickname}</span>님이 살펴본
            식당
          </h1>
        </div>
      </div>

      <div className={styles.headerDivider} />

      <main className={styles.main}>
        {list.map((restaurant, index) => (
          <div key={restaurant.name}>
            <div className={styles.itemWrap}>
              <div
                className={styles.item}
                role="button"
                tabIndex={0}
                onClick={() => navigate("/detail", { state: { restaurant } })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    navigate("/detail", { state: { restaurant } });
                }}
              >
                <div className={styles.thumb}>
                  <img
                    src={restaurant.image || "/empty-store.png"}
                    alt={restaurant.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/empty-store.png";
                    }}
                  />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{restaurant.name}</p>
                  <p className={styles.meta}>
                    {restaurant.category}
                    {restaurant.distance ? ` • ${restaurant.distance}` : ""}
                  </p>
                  <p className={styles.date}>{restaurant._histDate}</p>
                </div>
              </div>
            </div>
            {index < list.length - 1 && <div className={styles.rowDivider} />}
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
