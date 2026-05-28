import { useNavigate } from "react-router-dom";
import styles from "./MenuHistory.module.scss";
import BottomNav from "../../components/BottomNav/BottomNav";
import { useAuth } from "../../hooks/useAuth";
import { useHistoryData } from "../../hooks/useHistoryData";
import { BADGE_KR } from "../../data/constants";

export default function MenuHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const nickname = user?.nickname ?? "멋사";

  const { list } = useHistoryData();
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
          <div key={restaurant.historyId}>
            <div className={styles.itemWrap}>
              <div
                className={styles.item}
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigate("/detail", {
                    state: { restaurant, fromHistory: true },
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    navigate("/detail", {
                      state: { restaurant, fromHistory: true },
                    });
                }}
              >
                <div className={styles.thumb}>
                  <img
                    src={restaurant.image || "/empty-store2.png"}
                    alt={restaurant.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/empty-store2.png";
                    }}
                  />
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{restaurant.name}</p>
                  <p className={styles.meta}>
                    {restaurant.category}
                    {restaurant.badge
                      ? ` • ${BADGE_KR[restaurant.badge] ?? restaurant.badge}`
                      : ""}
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
