import { useNavigate, useLocation } from "react-router-dom";
import mapImg from "../assets/map.png";
import "./DirectionsView.scss";

export default function DirectionsView() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;

  if (!restaurant) return null;

  const { name, image, walkingMinutes, distanceKm, carMinutes } = restaurant;

  return (
    <div className="dv-page">
      <div className="dv-map">
        <img src={mapImg} alt="지도" />
        <button className="dv-back-btn" onClick={() => navigate(-1)}>
          <img src="/icons/back.png" alt="뒤로" />
        </button>
      </div>

      <div className="dv-sheet">
        <div className="dv-sheet-handle" />

        <div className="dv-restaurant-img">
          <img src={image} alt={name} />
        </div>

        <div className="dv-info">
          <div className="dv-name-row">
            <h2 className="dv-name">{name}</h2>
            <button className="dv-more-btn">···</button>
          </div>
          <div className="dv-dots">
            <span className="dv-dot active" />
            <span className="dv-dot" />
            <span className="dv-dot" />
          </div>
          <p className="dv-walk">도보 {walkingMinutes}분 • {distanceKm}km</p>
          <p className="dv-car">예상 소요: 자동차 {carMinutes}분</p>
        </div>

        <div className="dv-btns">
          <button className="dv-nav-btn">
            <img src="/icons/direction.png" alt="" />
            길찾기
          </button>
        </div>
      </div>
    </div>
  );
}
