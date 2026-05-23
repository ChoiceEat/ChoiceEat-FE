import { useNavigate } from "react-router-dom";
import styles from "./BottomNav.module.scss";
import ForkKnifeIcon from "../../assets/icons/fork-knife.png";
import HomeActiveIcon from "../../assets/icons/home-active.svg";
import HomeInactiveIcon from "../../assets/icons/home-inactive.svg";
import SettingsActiveIcon from "../../assets/icons/settings-active.svg";
import SettingsInactiveIcon from "../../assets/icons/settings-inactive.svg";

/**
 * @param {"home" | "settings"} activePage - 현재 활성화된 탭
 * @param {string} fabPath - FAB 버튼 클릭 시 이동할 경로
 */
export default function BottomNav({ activePage, fabPath = "/welcome" }) {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <div className={styles.navBar}>
        <button className={styles.navTab} onClick={() => navigate("/home")}>
          <img
            src={activePage === "home" ? HomeActiveIcon : HomeInactiveIcon}
            alt="홈"
            className={styles.navTabIcon}
          />
          <span
            className={`${styles.navTabLabel} ${activePage === "home" ? styles.navTabLabelActive : ""}`}
          >
            홈
          </span>
        </button>
        <button className={styles.navTab} onClick={() => navigate("/settings")}>
          <img
            src={
              activePage === "settings"
                ? SettingsActiveIcon
                : SettingsInactiveIcon
            }
            alt="설정"
            className={styles.navTabIcon}
          />
          <span
            className={`${styles.navTabLabel} ${activePage === "settings" ? styles.navTabLabelActive : ""}`}
          >
            설정
          </span>
        </button>
      </div>
      <div
        className={styles.navFab}
        onClick={() => navigate(fabPath)}
        style={{ cursor: "pointer" }}
      >
        <img src={ForkKnifeIcon} alt="" className={styles.navFabIcon} />
      </div>
    </nav>
  );
}
