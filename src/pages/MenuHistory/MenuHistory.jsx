import { useNavigate } from "react-router-dom";
import "./MenuHistory.scss";
import styles from "../Settings/Settings.module.scss";
import ForkKnifeIcon from "../../assets/icons/fork-knife.png";
import HomeInactiveIcon from "../../assets/icons/home-inactive.svg";
import SettingsInactiveIcon from "../../assets/icons/settings-inactive.svg";
import { RESTAURANTS } from "../../data/restaurants";
import { MOCK_HISTORY_DATES } from "../../data/history";

export default function MenuHistory() {
  const navigate = useNavigate();
  const recentRestaurants = Object.values(RESTAURANTS).slice(0, 4);

  return (
    <div className="mhist-container">
      <div className="mhist-header">
        <div className="mhist-header-row">
          <button className="mhist-back-btn" onClick={() => navigate(-1)}>
            <img src="/icons/back.png" alt="뒤로" />
          </button>
          <h1 className="mhist-title">
            <span className="mhist-title-green">멋사</span>님이 살펴본 식당
          </h1>
        </div>
        <div className="mhist-edit-row">
          <button className="mhist-edit-btn">
            <img src="/icons/edit.svg" />
            편집
          </button>
        </div>
      </div>

      <div className="mhist-header-divider" />

      <main className="mhist-main">
        {recentRestaurants.map((restaurant, index) => (
          <div key={restaurant.name}>
            <div
              className="mhist-item"
              onClick={() =>
                navigate("/detail", { state: { restaurant } })
              }
            >
              <div className="mhist-thumb">
                <img
                  src={restaurant.image || "/empty-store.png"}
                  alt={restaurant.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/empty-store.png";
                  }}
                />
              </div>
              <div className="mhist-info">
                <p className="mhist-name">{restaurant.name}</p>
                <p className="mhist-meta">
                  {restaurant.category}
                  {restaurant.distance ? ` • ${restaurant.distance}` : ""}
                </p>
                <p className="mhist-date">{MOCK_HISTORY_DATES[index]}</p>
              </div>
            </div>
            {index < recentRestaurants.length - 1 && (
              <div className="mhist-row-divider" />
            )}
          </div>
        ))}
      </main>

      <nav className={styles.nav}>
        <div className={styles.navBar}>
          <button className={styles.navTab} onClick={() => navigate("/home")}>
            <img src={HomeInactiveIcon} alt="홈" className={styles.navTabIcon} />
            <span className={styles.navTabLabel}>홈</span>
          </button>
          <button
            className={styles.navTab}
            onClick={() => navigate("/settings")}
          >
            <img
              src={SettingsInactiveIcon}
              alt="설정"
              className={styles.navTabIcon}
            />
            <span className={styles.navTabLabel}>설정</span>
          </button>
        </div>
        <div
          className={styles.navFab}
          onClick={() => navigate("/step1")}
          style={{ cursor: "pointer" }}
        >
          <img src={ForkKnifeIcon} alt="" className={styles.navFabIcon} />
        </div>
      </nav>
    </div>
  );
}
