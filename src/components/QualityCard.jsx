export default function QualityCard() {
  return (
    <div className="glass-card">
      <div className="card-inner">

        {/* 음식점 이미지 */}
        <div className="restaurant-img">음식점 이미지</div>

        {/* 가치 배지 */}
        <div className="value-badge">
          주변에서 별점과 리뷰가<br />가장 높은 음식점입니다
        </div>

        {/* 음식점 정보 */}
        <p className="restaurant-name">고급 레스토랑</p>
        <p className="restaurant-price">35,000원</p>
        <p className="restaurant-meta">★★★★★ 4.9 (256) · 양식 · 2.1km</p>
        <p className="restaurant-status">영업중 · 주차 가능</p>

        {/* 위로 스와이프 힌트 */}
        <div className="swipe-up-hint">
          <div className="swipe-up-arrow">↑</div>
          <div className="swipe-up-text">위로 밀어서 선택</div>
        </div>

      </div>
    </div>
  );
}
