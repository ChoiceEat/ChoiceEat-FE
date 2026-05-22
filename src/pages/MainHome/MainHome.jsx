import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainHome.scss';
import styles from "../Settings/Settings.module.scss";
import ForkKnifeIcon from '../../assets/icons/fork-knife.png';
import HomeActiveIcon from "../../assets/icons/home-active.svg";
import SettingsInactiveIcon from "../../assets/icons/settings-inactive.svg";
import { RECOMMENDED_RESTAURANTS, RESTAURANTS } from '../../data/restaurants';

export default function MainHome() {
  const navigate = useNavigate();
  const [savedAddress] = useState(
    () => JSON.parse(localStorage.getItem('savedAddress') || 'null')
  );

  return (
    <div className="mh-container">

      {/* ── 상단 헤더 ── */}
      <header className="mh-header">
        <h1 className="mh-logo">Choice Eat</h1>
        <div className="mh-header-bottom">
          <p className="mh-greeting">
            어서오세요, <strong>멋사</strong>님 !
          </p>
          <div className="mh-location">
            <img
              src="icons/location.png"
              alt="위치 아이콘"
              className="mh-location-icon"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <button className="mh-location-btn" onClick={() => navigate('/address')}>
              <span className="mh-location-text">{savedAddress ? savedAddress.name : '창신동'}</span>
              <img src="/icons/arrow-right.svg" className="mh-chevron"/>
            </button>
          </div>
        </div>
      </header>

      {/* ── 배너 영역 ── */}
      <section className="mh-banner">
        <div className="mh-banner-content">
          <p className="mh-banner-text">
            나만의 맛집<br />
            <span className="mh-banner-text-row">
              찾으러 <strong>바로가기</strong>
              <button
                className="mh-banner-arrow"
                onClick={() => navigate('/step1')}
                aria-label="맛집 찾기"
              >
                <img src="/icons/next.svg"/>
              </button>
            </span>
          </p>
        </div>
        <div className="mh-banner-mascot">
          <img
            src="char-main.svg"
            alt="초이스잇 마스코트"
            className="mh-mascot-img"
          />
        </div>
      </section>

      {/* ── 메인 스크롤 영역 ── */}
      <main className="mh-main">
        <section className="mh-section">
          <h2 className="mh-section-title">
            <span className="mh-highlight">초이스잇</span> 히스토리
          </h2>

          {RECOMMENDED_RESTAURANTS.length === 0 ? (
            <div className="mh-empty-history">
              <p>초이스잇과 함께 첫 맛집을 찾아볼까요? 🍚</p>
              <img src="/char-smile.png" alt="empty" className="mh-empty-icon" />
            </div>
          ) : (
            <div className="mh-restaurant-grid">
              {RECOMMENDED_RESTAURANTS.map((item) => (
                <div
                  key={item.id}
                  className="mh-restaurant-card"
                  onClick={() => navigate('/detail', { state: { restaurant: RESTAURANTS[item.type] } })}
                >
                  <div className="mh-card-image-wrap">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mh-card-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/empty-store.png';
                      }}
                    />
                  </div>
                  <div className="mh-card-info">
                    <p className="mh-card-name">{item.name}</p>
                    <p className="mh-card-tag">{item.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 안내 문구 */}
        <div className="mh-info-bar">
          <p className="mh-info-text">
            초이스잇이 초이스 한 추천 맛집!&nbsp; 마음에 드시는 곳이 있나요?
          </p>
        </div>
      </main>

      {/* ── 하단 내비게이션 ── */}
      <nav className={styles.nav}>
        <div className={styles.navBar}>
          <button className={styles.navTab} onClick={() => navigate('/home')}>
            <img
              src={HomeActiveIcon}
              alt="홈"
              className={styles.navTabIcon}
            />
            <span className={`${styles.navTabLabel} ${styles.navTabLabelActive}`}>홈</span>
          </button>
          <button className={styles.navTab} onClick={() => navigate('/settings')}>
            <img
              src={SettingsInactiveIcon}
              alt="설정"
              className={styles.navTabIcon}
            />
            <span className={styles.navTabLabel}>설정</span>
          </button>
        </div>
        <div className={styles.navFab} onClick={() => navigate('/step1')} style={{ cursor: 'pointer' }}>
          <img src={ForkKnifeIcon} alt="" className={styles.navFabIcon} />
        </div>
      </nav>

    </div>
  );
}