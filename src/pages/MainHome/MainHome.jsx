import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainHome.scss';
import value from '../../assets/value.png';
import example1 from '../../assets/example1.png';
import example2 from '../../assets/example2.png';

// 추천 맛집 데이터
const recommendedRestaurants = [
  { id: 1, name: '나는야 짜장면', tag: '밸런스 픽', image: value },
  { id: 2, name: '우동우야',     tag: '가성비 픽', image: example1 },
  { id: 3, name: '곱도티맛',    tag: '퀄리티 픽', image: example2 },
  { id: 4, name: '우왕굿',      tag: '밸런스 픽', image: '/empty-store/store4.jpg' },
];

export default function MainHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
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
            {savedAddress ? savedAddress.name : '나만의'} 맛집<br />
            <span className="mh-banner-text-row">
              찾으러 <strong>바로가기</strong>
              <button
                className="mh-banner-arrow"
                onClick={() => navigate('/recommend')}
                aria-label="맛집 찾기"
              >
                <img src="/icons/next.svg"/>
              </button>
            </span>
          </p>
        </div>
        <div className="mh-banner-mascot">
          <img
            src="char-menu.png"
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

          {recommendedRestaurants.length === 0 ? (
            <div className="mh-empty-history">
              <p>초이스잇과 함께 첫 맛집을 찾아볼까요? 🍚</p>
              <img src="/char-smile.png" alt="empty" className="mh-empty-icon" />
            </div>
          ) : (
            <div className="mh-restaurant-grid">
              {recommendedRestaurants.map((item) => (
                <div
                  key={item.id}
                  className="mh-restaurant-card"
                  onClick={() => navigate(`/restaurant/${item.id}`)}
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

      {/* ── 하단 탭바 ── */}
      <nav className="mh-tab-bar">
        <button
          className={`mh-tab-item ${activeTab === 'home' ? 'mh-tab-active' : ''}`}
          onClick={() => { setActiveTab('home'); navigate('/'); }}
        >
          <img src="icons/home.svg" alt="home" className="mh-tab-icon"/>
          <span>홈</span>
        </button>

        {/* 중앙 FAB */}
        <button
          className="mh-tab-fab"
          onClick={() => navigate('/recommend')}
          aria-label="맛집 찾기"
        >
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V10C8 12.2 9.8 14 12 14V26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 3V14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 3V26M16 3C16 3 21 6 21 10C21 14 16 14 16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          className={`mh-tab-item ${activeTab === 'settings' ? 'mh-tab-active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <img src="icons/Settings.svg" alt="설정" className="mh-tab-icon"/>
          <span>설정</span>
        </button>
      </nav>

    </div>
  );
}