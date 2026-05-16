import { RESTAURANTS } from "../data/restaurants";

export default function ValueCard() {
  const { image } = RESTAURANTS.value;
  return (
    <div className="glass-card">
      <div className="card-inner">
        <div
          className="restaurant-img"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="restaurant-img__overlay" />
          <div className="restaurant-img__info">
            <p className="restaurant-img__name">저렴한 맛집</p>
            <p className="restaurant-img__price">8,000원</p>
          </div>
        </div>
        <div className="card-body">
          <p className="card-label">가성비 맛집</p>
          <p className="card-desc">
            주변 같은 음식 파는 식당보다 15% 이상 저렴합니다
          </p>
          <div className="value-badge">가성비 최강 선택</div>
          <div className="card-spacer" />
          <p className="restaurant-meta">★★★★☆ 4.2 (89) · 한식 · 800m</p>
          <p className="restaurant-status">영업중 · 주차 가능</p>
        </div>
      </div>
    </div>
  );
}
