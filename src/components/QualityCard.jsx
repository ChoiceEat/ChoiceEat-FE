export default function QualityCard() {
  return (
    <div className="glass-card">
      <div className="card-inner">
        <div className="restaurant-img">
          <div className="restaurant-img__overlay" />
          <div className="restaurant-img__info">
            <p className="restaurant-img__name">고급 레스토랑</p>
            <p className="restaurant-img__price">35,000원</p>
          </div>
        </div>
        <div className="card-body">
          <p className="card-label">퀄리티 맛집</p>
          <p className="card-desc">주변에서 별점과 리뷰가 가장 높은 음식점입니다</p>
          <div className="value-badge">
            최고 퀄리티 선택
          </div>
          <div className="card-spacer" />
          <p className="restaurant-meta">★★★★★ 4.9 (256) · 양식 · 2.1km</p>
          <p className="restaurant-status">영업중 · 주차 가능</p>
        </div>
      </div>
    </div>
  );
}
