import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainHome.scss";
import BottomNav from "../../components/BottomNav/BottomNav";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "../../hooks/useHistory";

export default function MainHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const nickname = user?.nickname ?? "멋사";
  const [savedAddress] = useState(() =>
    JSON.parse(localStorage.getItem("savedAddress") || "null"),
  );
  const { list: historyList } = useHistory();

  return (
    <div className="mh-container">
      {/* ── 상단 헤더 ── */}
      <header className="mh-header">
        <h1 className="mh-logo">Choice Eat</h1>
        <div className="mh-header-bottom">
          <p className="mh-greeting">
            어서오세요, <strong>{nickname}</strong>님 !
          </p>
          <div className="mh-location">
            <img
              src="icons/location.png"
              alt="위치 아이콘"
              className="mh-location-icon"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <button
              className="mh-location-btn"
              onClick={() => navigate("/address")}
            >
              <span className="mh-location-text">
                {savedAddress ? savedAddress.name : "창신동"}
              </span>
              <img src="/icons/arrow-right.svg" className="mh-chevron" />
            </button>
          </div>
        </div>
      </header>

      {/* ── 배너 영역 ── */}
      <section className="mh-banner">
        <div className="mh-banner-content">
          <p className="mh-banner-text">
            나만의 맛집
            <br />
            <span className="mh-banner-text-row">
              찾으러 <strong>바로가기</strong>
              <button
                className="mh-banner-arrow"
                onClick={() => navigate("/welcome")}
                aria-label="맛집 찾기"
              >
                <img src="/icons/next.svg" />
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
            <button
              className="mh-location-btn"
              onClick={() => navigate("/menu-history")}
            >
              <span className="mh-highlight">초이스잇</span> 히스토리
              <img src="/icons/arrow-right.svg" className="mh-chevron" />
            </button>
          </h2>

          {historyList.length === 0 ? (
            <div className="mh-empty-history">
              <p>초이스잇과 함께 첫 맛집을 찾아볼까요? 🍚</p>
              <img
                src="/char-smile.png"
                alt="empty"
                className="mh-empty-icon"
              />
            </div>
          ) : (
            <div className="mh-restaurant-grid">
              {historyList.map((restaurant) => (
                <div
                  key={restaurant.name}
                  className="mh-restaurant-card"
                  onClick={() => navigate("/detail", { state: { restaurant } })}
                >
                  <div className="mh-card-image-wrap">
                    <img
                      src={restaurant.image || "/empty-store.png"}
                      alt={restaurant.name}
                      className="mh-card-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/empty-store.png";
                      }}
                    />
                  </div>
                  <div className="mh-card-info">
                    <p className="mh-card-name">{restaurant.name}</p>
                    <p className="mh-card-tag">{restaurant.tag}</p>
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

      <BottomNav activePage="home" />
    </div>
  );
}
