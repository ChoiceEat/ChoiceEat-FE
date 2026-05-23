import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.scss";
import BackIcon from "../../assets/icons/backB.svg";
import HomeInactiveIcon from "../../assets/icons/home-inactive.svg";
import SettingsActiveIcon from "../../assets/icons/settings-active.svg";
import ForkKnifeIcon from "../../assets/icons/fork-knife.png";
import ChevronRightIcon from "../../assets/icons/chevron-right.svg";

const RADIUS_OPTIONS = ["1km", "2km", "3km"];

export default function Setting() {
  const navigate = useNavigate();

  const [locationPermission, setLocationPermission] = useState("허용");
  const [locationService, setLocationService] = useState("꺼짐");

  const [notification, setNotification] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [searchRadius, setSearchRadius] = useState("3km");
  const [showRadiusPicker, setShowRadiusPicker] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className={styles.page}>
      {/* 스크롤 영역 */}
      <div className={styles.scrollArea}>
        {/* 헤더 */}
        <header className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="뒤로가기" />
          </button>
          <span className={styles.headerTitle}>설정</span>
        </header>

        {/* ── 허용 및 서비스 ── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>허용 및 서비스</p>

          <button
            className={styles.rowBtn}
            onClick={() =>
              setLocationPermission((v) => (v === "허용" ? "거부" : "허용"))
            }
          >
            <span className={styles.rowLabel}>위치 권한</span>
            <span
              className={`${styles.statusText} ${locationPermission === "허용" ? styles.statusAllowed : styles.statusDenied}`}
            >
              {locationPermission}
            </span>
          </button>
          <div className={styles.divider} />

          <button
            className={styles.rowBtn}
            onClick={() =>
              setLocationService((v) => (v === "켜짐" ? "꺼짐" : "켜짐"))
            }
          >
            <span className={styles.rowLabel}>위치 서비스</span>
            <span
              className={`${styles.statusText} ${locationService === "켜짐" ? styles.statusAllowed : styles.statusDenied}`}
            >
              {locationService}
            </span>
          </button>
          <div className={styles.divider} />
        </section>

        {/* ── 이벤트 및 알림 ── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>이벤트 및 알림</p>

          <div className={styles.row}>
            <span className={styles.rowLabel}>알림</span>
            <button
              className={`${styles.toggle} ${notification ? styles.toggleOn : ""}`}
              onClick={() => setNotification((v) => !v)}
              aria-label="알림 토글"
            />
          </div>
          <div className={styles.divider} />

          <div className={styles.row}>
            <span className={styles.rowLabel}>마케팅 수신 동의</span>
            <button
              className={`${styles.toggle} ${marketing ? styles.toggleOn : ""}`}
              onClick={() => setMarketing((v) => !v)}
              aria-label="마케팅 수신 동의 토글"
            />
          </div>
          <div className={styles.divider} />
        </section>

        {/* ── 검색 ── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>검색</p>

          <button
            className={styles.rowBtn}
            onClick={() => setShowRadiusPicker(true)}
          >
            <div className={styles.rowGroup}>
              <span className={styles.rowLabel}>검색 반경</span>
              <span className={styles.rowSub}>{searchRadius}</span>
            </div>
            <img src={ChevronRightIcon} alt="" className={styles.chevron} />
          </button>
          <div className={styles.divider} />
        </section>

        {/* ── 정보 ── */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>정보</p>

          <div className={styles.row}>
            <span className={styles.rowLabel}>버전 정보</span>
            <span className={styles.versionText}>1.0.0</span>
          </div>
          <div className={styles.divider} />

          <button className={styles.rowBtn} onClick={handleLogout}>
            <span className={styles.rowLabel}>로그아웃</span>
            <img src={ChevronRightIcon} alt="" className={styles.chevron} />
          </button>
          <div className={styles.divider} />
        </section>
      </div>

      {/* ── 하단 내비게이션 ── */}
      <nav className={styles.nav}>
        <div className={styles.navBar}>
          <button className={styles.navTab} onClick={() => navigate("/home")}>
            <img
              src={HomeInactiveIcon}
              alt="홈"
              className={styles.navTabIcon}
            />
            <span className={styles.navTabLabel}>홈</span>
          </button>
          <button
            className={styles.navTab}
            onClick={() => navigate("/settings")}
          >
            <img
              src={SettingsActiveIcon}
              alt="설정"
              className={styles.navTabIcon}
            />
            <span
              className={`${styles.navTabLabel} ${styles.navTabLabelActive}`}
            >
              설정
            </span>
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

      {/* 검색 반경 시트 */}
      {showRadiusPicker && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setShowRadiusPicker(false)}
          />
          <div className={styles.sheet}>
            <p className={styles.sheetTitle}>검색 반경</p>
            {RADIUS_OPTIONS.map((option) => (
              <button
                key={option}
                className={`${styles.sheetItem} ${searchRadius === option ? styles.sheetItemActive : ""}`}
                onClick={() => {
                  setSearchRadius(option);
                  setShowRadiusPicker(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
