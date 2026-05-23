import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuHistory.scss";
import BottomNav from "../../components/BottomNav/BottomNav";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "../../hooks/useHistory";

export default function MenuHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const nickname = user?.nickname ?? "멋사";

  const { list, deleteItem, save } = useHistory();
  const [isEditing, setIsEditing] = useState(false);

  const handleDone = () => {
    save(list);
    setIsEditing(false);
  };

  return (
    <div className="mhist-container">
      <div className="mhist-header">
        <div className="mhist-header-row">
          <button className="mhist-back-btn" onClick={() => navigate(-1)}>
            <img src="/icons/back.png" alt="뒤로" />
          </button>
          <h1 className="mhist-title">
            <span className="mhist-title-green">{nickname}</span>님이 살펴본
            식당
          </h1>
        </div>
        <div className="mhist-edit-row">
          <button
            className="mhist-edit-btn"
            onClick={() => (isEditing ? handleDone() : setIsEditing(true))}
          >
            <img src="/icons/edit.svg" />
            {isEditing ? "완료" : "편집"}
          </button>
        </div>
      </div>

      <div className="mhist-header-divider" />

      <main className="mhist-main">
        {list.map((restaurant, index) => (
          <div key={restaurant.name}>
            <div className="mhist-item-wrap">
              <div
                className="mhist-item"
                onClick={() => {
                  if (!isEditing)
                    navigate("/detail", { state: { restaurant } });
                }}
              >
                <div className="mhist-thumb">
                  <img
                    src={restaurant.image || "/empty-store.png"}
                    alt={restaurant.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/empty-store.png";
                    }}
                  />
                </div>
                <div className="mhist-info">
                  <p className="mhist-name">{restaurant.name}</p>
                  <p className="mhist-meta">
                    {restaurant.category}
                    {restaurant.distance ? ` • ${restaurant.distance}` : ""}
                  </p>
                  <p className="mhist-date">{restaurant._histDate}</p>
                </div>
              </div>
              {isEditing && (
                <button
                  className="mhist-delete-btn"
                  onClick={() => deleteItem(restaurant.name)}
                  aria-label="삭제"
                >
                  ✕
                </button>
              )}
            </div>
            {index < list.length - 1 && <div className="mhist-row-divider" />}
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
