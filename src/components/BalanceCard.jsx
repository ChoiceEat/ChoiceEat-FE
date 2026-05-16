export default function BalanceCard() {
  return (
    <div className="glass-card">
      <div className="card-inner">
        <div className="restaurant-img">
          <div className="restaurant-img__overlay" />
          <div className="restaurant-img__info">
            <p className="restaurant-img__name">균형잡힌 음식점</p>
            <p className="restaurant-img__price">18,000원</p>
          </div>
        </div>
        <div className="card-body">
          <p className="card-label">밸런스 맛집</p>
          <p className="card-desc">가격과 퀄리티의 균형이 가장 좋은 선택입니다</p>
          <div className="value-badge">
            "아 여기 ㄹㅇ데이트코드 맛집임요 굿굿"
          </div>
          <div className="card-spacer" />
          <p className="restaurant-meta">★★★★☆ 4.6 (178) · 일식 · 1.5km</p>
          <p className="restaurant-status">영업중 · 주차 가능</p>
        </div>
      </div>
    </div>
  );
}
