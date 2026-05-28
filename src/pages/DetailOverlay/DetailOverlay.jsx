import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./DetailOverlay.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "../../hooks/useHistory";
import { BADGE_KR } from "../../data/constants";

export default function DetailOverlay() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;
  const fromRecommend = state?.fromRecommend ?? false;
  const fromHistory = state?.fromHistory ?? false;
  const scrollRef = useRef(null);
  const { user } = useAuth();
  const nickname = user?.nickname ?? "00";
  const { addItem } = useHistory();
  const [shareUrl, setShareUrl] = useState(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  if (!restaurant) return null;

  const onClose = () => navigate(-1);
  const onConfirm = () => {
    addItem(restaurant);
    navigate("/confirm", { state: { restaurant } });
  };
  const onDirections = () => navigate("/directions", { state: { restaurant } });
  const onMenuRecommend = () =>
    navigate("/menu-recommend", { state: { restaurant } });

  const ratingValue = restaurant.rating?.split(" ").pop() ?? null;
  const koreanBadge = restaurant.badge
    ? (BADGE_KR[restaurant.badge] ?? restaurant.badge)
    : null;
  return (
    <div className={`${styles.overlay} ${styles.overlayOpen}`}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onClose}>
          <img src="/icons/back.png" alt="뒤로" />
        </button>
        <p className={styles.title}>
          {fromHistory
            ? restaurant.name
            : koreanBadge
              ? `${nickname}님 ${koreanBadge}을 선택하신 것 맞나요?`
              : restaurant.name}
        </p>
      </div>

      <div className={styles.scroll} ref={scrollRef}>
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            <img
              className={styles.mainImg}
              src={restaurant.image || "/empty-store2.png"}
              alt={restaurant.name}
              onError={(e) => {
                e.currentTarget.src = "/empty-store2.png";
              }}
            />
            <div className={styles.imgGradient} />

            <button
              className={styles.shareBtn}
              aria-label="공유"
              onClick={() => {
                const url =
                  restaurant.placeUrl ||
                  `https://map.kakao.com/link/map/${encodeURIComponent(restaurant.name)},${restaurant.lat},${restaurant.lng}`;
                setShareUrl(url);
              }}
            >
              <img src="/icons/share-detail.svg" />
            </button>

            {shareUrl && (
              <div className={styles.sharePopup}>
                <p className={styles.shareLabel}>공유 링크</p>
                <div className={styles.shareRow}>
                  <span className={styles.shareUrlText}>{shareUrl}</span>
                  <button
                    className={styles.shareCopyBtn}
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      setShareUrl(null);
                      alert("복사되었습니다!");
                    }}
                  >
                    복사
                  </button>
                </div>
                <button
                  className={styles.shareClose}
                  onClick={() => setShareUrl(null)}
                >
                  ✕
                </button>
              </div>
            )}

            <div className={styles.namePrice}>
              <h2 className={styles.name}>{restaurant.name}</h2>
              {ratingValue && (
                <div className={styles.ratingBadge}>
                  <span className={styles.ratingStar}>★</span>
                  <span className={styles.ratingNum}>{ratingValue}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.info}>
            {restaurant.rating && (
              <p className={styles.ratingFull}>
                {restaurant.rating}{restaurant.reviews != null ? ` (리뷰 ${restaurant.reviews}개)` : ""}
              </p>
            )}
            {(restaurant.category || restaurant.address || restaurant.distance) && (
              <p className={styles.meta}>
                {[restaurant.category, restaurant.address, restaurant.distance]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            )}
            {restaurant.hours && (
              <p className={styles.hours}>영업시간: {restaurant.hours}</p>
            )}
            {restaurant.phone && (
              <p className={styles.phone}>전화: {restaurant.phone}</p>
            )}
            {restaurant.features?.length > 0 && (
              <p className={styles.features}>{restaurant.features.join(" • ")}</p>
            )}
          </div>

          <div className={styles.cardBtns}>
            <div className={styles.btns}>
              {restaurant.kakaoPlaceId && (
                <button className={styles.btn} onClick={onMenuRecommend}>
                  메뉴 추천
                </button>
              )}
              <button className={styles.btn} onClick={onDirections}>
                길찾기
              </button>
            </div>
            {fromRecommend && (
              <button className={styles.btnConfirm} onClick={onConfirm}>
                선택 확정
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
