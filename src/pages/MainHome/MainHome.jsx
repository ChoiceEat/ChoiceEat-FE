import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainHome.module.scss";
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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Choice Eat</h1>
        <div className={styles.headerBottom}>
          <p className={styles.greeting}>
            어서오세요, <strong>{nickname}</strong>님 !
          </p>
          <div className={styles.location}>
            <img
              src="icons/location.png"
              alt="위치 아이콘"
              className={styles.locationIcon}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <button
              className={styles.locationBtn}
              onClick={() => navigate("/address")}
            >
              <span className={styles.locationText}>
                {savedAddress ? savedAddress.name : "창신동"}
              </span>
              <img src="/icons/arrow-right.svg" className={styles.chevron} />
            </button>
          </div>
        </div>
      </header>

      <section className={styles.banner}>
        <div className={styles.bannerContent}>
          <p className={styles.bannerText}>
            나만의 맛집
            <br />
            <span className={styles.bannerTextRow}>
              찾으러 <strong>바로가기</strong>
              <button
                className={styles.bannerArrow}
                onClick={() => navigate("/welcome")}
                aria-label="맛집 찾기"
              >
                <img src="/icons/next.svg" />
              </button>
            </span>
          </p>
        </div>
        <div className={styles.bannerMascot}>
          <img
            src="char-main.svg"
            alt="초이스잇 마스코트"
            className={styles.mascotImg}
          />
        </div>
      </section>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <button
              className={styles.locationBtn}
              onClick={() => navigate("/menu-history")}
            >
              <span className={styles.highlight}>초이스잇</span> 히스토리
              <img src="/icons/arrow-right.svg" className={styles.chevron} />
            </button>
          </h2>

          {historyList.length === 0 ? (
            <div className={styles.emptyHistory}>
              <p>초이스잇과 함께 첫 맛집을 찾아볼까요? 🍚</p>
              <img
                src="/char-smile.png"
                alt="empty"
                className={styles.emptyIcon}
              />
            </div>
          ) : (
            <div className={styles.restaurantGrid}>
              {historyList.map((restaurant) => (
                <div
                  key={restaurant.name}
                  className={styles.restaurantCard}
                  onClick={() => navigate("/detail", { state: { restaurant } })}
                >
                  <div className={styles.cardImageWrap}>
                    <img
                      src={restaurant.image || "/empty-store.png"}
                      alt={restaurant.name}
                      className={styles.cardImage}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/empty-store.png";
                      }}
                    />
                  </div>
                  <div className={styles.cardInfo}>
                    <p className={styles.cardName}>{restaurant.name}</p>
                    <p className={styles.cardTag}>{restaurant.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className={styles.infoBar}>
          <p className={styles.infoText}>
            초이스잇이 초이스 한 추천 맛집!&nbsp; 마음에 드시는 곳이 있나요?
          </p>
        </div>
      </main>

      <BottomNav activePage="home" />
    </div>
  );
}
