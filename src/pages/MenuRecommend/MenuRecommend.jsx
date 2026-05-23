import { useLocation, useNavigate } from "react-router-dom";
import "./MenuRecommend.scss";
import BottomNav from "../../components/BottomNav/BottomNav";

export default function MenuRecommend() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;

  if (!restaurant) return null;

  return (
    <div className="mr-page">
      <div className="mr-header">
        <button className="mr-back-btn" onClick={() => navigate(-1)}>
          <img src="/icons/back.png" alt="뒤로" />
        </button>
        <h1 className="mr-logo">Choice Eat</h1>
      </div>

      <div className="mr-intro">
        <div className="mr-badge-wrap">
          <div className="mr-badge">
            <span>{restaurant.name}의 인기 메뉴들이에요!</span>
          </div>
        </div>
        <img className="mr-mascot" src="/char-vibe.svg" alt="" />
      </div>

      <div className="mr-list">
        {restaurant.menus.map((menu, i) => (
          <div className="mr-card" key={i}>
            <div className="mr-card-img-wrap">
              <img
                className="mr-card-img"
                src={menu.image || "/empty-food.svg"}
                alt={menu.name}
                onError={(e) => {
                  e.currentTarget.src = "/empty-food.svg";
                }}
              />
            </div>
            <div className="mr-card-info">
              <p className="mr-card-name">{menu.name}</p>
              <p className="mr-card-price">{menu.price}</p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
