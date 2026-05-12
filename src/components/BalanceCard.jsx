export default function BalanceCard() {
  return (
    <div className="glass-card">
      <div className="card-inner">

        {/* 음식점 이미지 */}
        <div className="restaurant-img">음식점 이미지</div>

        {/* 가치 배지 */}
        <div className="value-badge">
          가격과 퀄리티의 균형이<br />가장 좋은 선택입니다
        </div>

        {/* 음식점 정보 */}
        <p className="restaurant-name">균형잡힌 음식점</p>
        <p className="restaurant-price">18,000원</p>
        <p className="restaurant-meta">★★★★☆ 4.6 (178) · 일식 · 1.5km</p>
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
