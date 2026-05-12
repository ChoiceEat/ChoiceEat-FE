export default function ValueCard() {
  return (
    <div className="glass-card">
      <div className="card-inner">

        {/* 음식점 이미지 */}
        <div className="restaurant-img">음식점 이미지</div>

        {/* 가치 배지 */}
        <div className="value-badge">
          주변 같은 음식 파는 식당보다<br />15% 이상 저렴합니다
        </div>

        {/* 음식점 정보 */}
        <p className="restaurant-name">저렴한 맛집</p>
        <p className="restaurant-price">8,000원</p>
        <p className="restaurant-meta">★★★★☆ 4.2 (89) · 한식 · 800m</p>
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
