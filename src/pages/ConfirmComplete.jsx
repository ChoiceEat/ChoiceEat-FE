import {useNavigate} from "react-router-dom";
export default function ConfirmComplete({ restaurant }) {

  const navigate = useNavigate();
  
  if (!restaurant) return null;

  return (
    <div className="confirm-simple-page">
      <div className="confirm-simple-content">
        <div className="confirm-simple-check">✓</div>

        <h1 className="confirm-simple-title">선택이 완료되었어요!</h1>

        <div className="confirm-simple-info">
          <h2>{restaurant.name}</h2>
          <p>{restaurant.category} · {restaurant.distance}</p>
          <p>영업시간: {restaurant.hours}</p>
          <p>전화: {restaurant.phone}</p>
        </div>

        <button className="confirm-simple-btn" onClick={() => navigate("/")}>
          처음으로
        </button>
      </div>
    </div>
  );
}