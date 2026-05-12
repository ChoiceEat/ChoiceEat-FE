import { useEffect, useRef } from 'react';

const RESTAURANTS = {
  quality: {
    badge: 'QUALITY PICK',
    name: '고급 레스토랑',
    price: '35,000원',
    rating: '★★★★★ 4.9',
    reviews: 256,
    category: '양식',
    distance: '2.1km',
    status: '영업중 · 예약 권장 · 주차 가능',
    hours: '11:30–22:00 (브레이크타임 15:00–17:00)',
    address: '서울시 강남구 청담동 123-4',
    desc: '주변에서 별점과 리뷰가 가장 높은 레스토랑입니다. 특별한 날을 위한 완벽한 선택으로, 최고의 식사 경험을 제공합니다.',
    menus: [
      { name: '립아이 스테이크', price: '42,000원' },
      { name: '트러플 파스타', price: '28,000원' },
      { name: '하우스 와인', price: '15,000원' },
    ],
    features: ['예약 권장', '주차 가능', '단체석 보유', '와인 페어링'],
    info: '서울시 강남구 청담동 · 예약 권장 · 주차 가능 · 브레이크타임 15:00–17:00',
  },
  balance: {
    badge: 'BALANCE PICK',
    name: '균형잡힌 음식점',
    price: '18,000원',
    rating: '★★★★☆ 4.6',
    reviews: 178,
    category: '일식',
    distance: '1.5km',
    status: '영업중 · 주차 가능',
    hours: '11:00–21:30 (매주 월요일 휴무)',
    address: '서울시 마포구 합정동 56-7',
    desc: '가격과 퀄리티의 균형이 가장 좋은 선택입니다. 부담 없이 만족도 높은 식사를 원하는 분께 최고의 선택입니다.',
    menus: [
      { name: '시그니처 라멘', price: '14,000원' },
      { name: '사시미 정식', price: '22,000원' },
      { name: '계절 사이드', price: '8,000원' },
    ],
    features: ['주차 가능', '예상 웨이팅 20분', '포장 가능', '단체 예약 가능'],
    info: '서울시 마포구 · 예상 웨이팅 20분 · 주차 가능 · 매주 월요일 휴무',
  },
  value: {
    badge: 'VALUE PICK',
    name: '저렴한 맛집',
    price: '8,000원',
    rating: '★★★★☆ 4.2',
    reviews: 89,
    category: '한식',
    distance: '800m',
    status: '영업중 · 주차 가능',
    hours: '08:00–20:00 (매일 운영)',
    address: '서울시 노원구 중계동 88-2',
    desc: '주변 같은 음식 파는 식당보다 15% 이상 저렴합니다. 알뜰하게 즐기는 한 끼로 가성비 최강의 선택입니다.',
    menus: [
      { name: '된장찌개 정식', price: '8,000원' },
      { name: '순두부찌개', price: '8,000원' },
      { name: '공기밥 추가', price: '1,000원' },
    ],
    features: ['주차 가능', '예상 웨이팅 10분', '포장 가능', '매일 운영'],
    info: '서울시 노원구 · 예상 웨이팅 10분 · 주차 가능 · 매일 운영',
  },
};

export default function DetailOverlay({ open, cardType, onClose }) {
  const data = RESTAURANTS[cardType] ?? RESTAURANTS['balance'];
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [open, cardType]);

  return (
    <div className={`detail-overlay${open ? ' open' : ''}`}>
      <button className="detail-back-btn" onClick={onClose}>←</button>

      {/* 스크롤 영역 — 하단 버튼 바 높이만큼 패딩 확보 */}
      <div className="detail-scroll" ref={scrollRef}>
        <div className="detail-body">
          
          <div className="detail-restaurant-img">
            <div className="detail-img-icon"/>
            <span >음식점 이미지</span>
          </div>

          <h1 className="detail-name">{data.name}</h1>
          <p className="detail-avg-price">{data.price} 평균</p>
          <p className="detail-meta">
            {data.rating} ({data.reviews}) · {data.category} · {data.distance}
          </p>
          <p className="detail-status">{data.status}</p>
          <p className="detail-desc">{data.desc}</p>

          

          <div className="detail-info-box">
            <h3 className="detail-box-title">대표 메뉴</h3>
            {data.menus.map((m, i) => (
              <div key={i} className="detail-menu-row">
                <span>{m.name}</span>
                <strong>{m.price}</strong>
              </div>
            ))}
          </div>

          <div className="detail-info-box">
            <h3 className="detail-box-title">매장 정보</h3>
            <p className="detail-info-text">📍 {data.address}</p>
            <p className="detail-info-text">🕐 {data.hours}</p>
          </div>

          <div className="detail-info-box">
            <h3 className="detail-box-title">주요 특징</h3>
            <p className="detail-info-text">{data.features.join(' · ')}</p>
          </div>

          {/* 하단 고정 버튼 바가 가리지 않도록 여백 */}
          <div className="detail-bottom-spacer" />
        </div>
      </div>

      {/* 하단 고정 글래스모피즘 버튼 바 */}
      <div className="detail-fixed-btns">
        {/* 선택 확정 버튼 */}
        <button className="detail-nav-btn rewarded-ad-btn">
          ✓ 선택 확정
        </button>
        {/* 길찾기 버튼 */}
        <button className="detail-nav-btn rewarded-ad-btn">
          길찾기
        </button>
      </div>
    </div>
  );
}
