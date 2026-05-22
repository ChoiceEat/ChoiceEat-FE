import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DetailOverlay.scss";

const BADGE_KR = {
  "QUALITY PICK": "퀄리티 픽",
  "BALANCE PICK": "밸런스 픽",
  "VALUE PICK": "가성비 픽",
};

export default function DetailOverlay() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  if (!restaurant) return null;

  const onClose = () => navigate(-1);
  const onConfirm = () => navigate("/confirm", { state: { restaurant } });
  const onDirections = () => navigate("/directions", { state: { restaurant } });
  const onMenuRecommend = () =>
    navigate("/menu-recommend", { state: { restaurant } });

  const ratingValue = restaurant.rating.split(" ").pop();
  const koreanBadge = BADGE_KR[restaurant.badge] ?? restaurant.badge;
  const moreCount = restaurant.menus.length + 3;

  return (
    <div className="do-overlay do-overlay--open">
      <div className="do-header">
        <button className="do-back-btn" onClick={onClose}>
          <img src="/icons/back.png" alt="뒤로" />
        </button>
        <p className="do-title">oo님 {koreanBadge}을 선택하신 것 맞나요?</p>
      </div>

      <div className="do-scroll" ref={scrollRef}>
        <div className="do-card">
          {/* 이미지 영역 */}
          <div className="do-image-wrap">
            <img
              className="do-main-img"
              src={restaurant.image || "/empty-store2.svg"}
              alt={restaurant.name}
              onError={(e) => {
                e.currentTarget.src = "/empty-store2.svg";
              }}
            />
            <div className="do-img-gradient" />

            <button className="do-share-btn" aria-label="공유">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>

            <div className="do-name-price">
              <h2 className="do-name">{restaurant.name}</h2>
            </div>

            <div className="do-rating-badge">
              <span className="do-rating-star">★</span>
              <span className="do-rating-num">{ratingValue}</span>
            </div>
          </div>

          {/* 상세 정보 */}
          <div className="do-info">
            <p className="do-rating-full">
              {restaurant.rating} (리뷰 {restaurant.reviews}개)
            </p>
            <p className="do-meta">
              {restaurant.category} • {restaurant.address} •{" "}
              {restaurant.distance}
            </p>
            <p className="do-hours">영업시간: {restaurant.hours}</p>
            <p className="do-phone">전화: {restaurant.phone}</p>
            <p className="do-features">{restaurant.features.join(" • ")}</p>
          </div>

          {/* 사진 썸네일 */}
          <div className="do-photos">
            <div className="do-photo">
              <img
                src={restaurant.image || "/empty-store2.svg"}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = "/empty-store2.svg";
                }}
              />
            </div>
            <div className="do-photo">
              <img
                src={restaurant.image || "/empty-store2.svg"}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = "/empty-store2.svg";
                }}
              />
            </div>
            <div className="do-photo">
              <img
                src={restaurant.image || "/empty-store2.svg"}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = "/empty-store2.svg";
                }}
              />
            </div>
            <div className="do-photo do-photo--more">
              <img
                src={restaurant.image || "/empty-store2.svg"}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = "/empty-store2.svg";
                }}
              />
              <span>+{moreCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 고정 하단 버튼 영역 */}
      <div className="do-footer">
        <div className="do-btns">
          <button className="do-btn" onClick={onMenuRecommend}>
            메뉴 추천
          </button>
          <button className="do-btn" onClick={onDirections}>
            길찾기
          </button>
        </div>
        <button className="do-btn-green do-btn--confirm" onClick={onConfirm}>
          선택 확정
        </button>
      </div>
    </div>
  );
}
