import { useEffect, useRef } from 'react';

export default function DetailOverlay({ open, restaurant, onClose, onConfirm }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [open, restaurant]);

  if (!restaurant) return null;

  return (
    <div className={`detail-overlay${open ? ' open' : ''}`}>
      <button className="detail-back-btn" onClick={onClose}>←</button>

      <div className="detail-scroll" ref={scrollRef}>
        <div className="detail-body">
          <div className="detail-badge-pill">{restaurant.badge}</div>

          <div className="detail-restaurant-img">
            <span>음식점 이미지</span>
          </div>

          <h1 className="detail-name">{restaurant.name}</h1>
          <p className="detail-avg-price">{restaurant.price} 평균</p>

          <p className="detail-meta">
            {restaurant.rating} ({restaurant.reviews}) · {restaurant.category} · {restaurant.distance}
          </p>

          <p className="detail-status">{restaurant.status}</p>
          <p className="detail-desc">{restaurant.desc}</p>

          <div className="detail-info-box">
            <h3 className="detail-box-title">대표 메뉴</h3>
            {restaurant.menus.map((m, i) => (
              <div key={i} className="detail-menu-row">
                <span>{m.name}</span>
                <strong>{m.price}</strong>
              </div>
            ))}
          </div>

          <div className="detail-info-box">
            <h3 className="detail-box-title">매장 정보</h3>
            <p className="detail-info-text">📍 {restaurant.address}</p>
            <p className="detail-info-text">🕐 {restaurant.hours}</p>
            <p className="detail-info-text">☎ {restaurant.phone}</p>
          </div>

          <div className="detail-info-box">
            <h3 className="detail-box-title">주요 특징</h3>
            <p className="detail-info-text">{restaurant.features.join(' · ')}</p>
          </div>

          <div className="detail-bottom-spacer" />
        </div>
      </div>

      <div className="detail-fixed-btns">
        <button className="detail-nav-btn rewarded-ad-btn" onClick={onConfirm}>
          ✓ 선택 확정
        </button>

        <button className="detail-nav-btn rewarded-ad-btn">
          길찾기
        </button>
      </div>
    </div>
  );
}