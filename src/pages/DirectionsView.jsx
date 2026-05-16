export default function DirectionsView({ open, restaurant, onBack }) {
  if (!restaurant) return null;

  const { name, walkingMinutes, distanceKm, carMinutes } = restaurant;

  return (
    <div className={`directions-view${open ? ' open' : ''}`}>
      <div className="directions-map-placeholder">
        <span className="directions-map-label">지도 영역</span>
        <span className="directions-map-sub">(음식점 위치 마커)</span>
      </div>

      <div className="directions-info">
        <h2 className="directions-name">{name}</h2>
        <p className="directions-walk">도보 {walkingMinutes}분 • {distanceKm}km</p>
        <p className="directions-car">예상 소요: 자동차 {carMinutes}분</p>
      </div>

      <div className="directions-btns">
        <button className="directions-btn-primary">길찾기 시작</button>
        <button className="directions-btn-ghost" onClick={onBack}>← 뒤로</button>
      </div>
    </div>
  );
}
