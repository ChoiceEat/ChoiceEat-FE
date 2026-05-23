import { useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import mapImg from "../../assets/map.png";
import "./DirectionsView.scss";

// 스냅 포지션 (translateY 값, 0 = 완전히 열림)
const SNAP_OPEN = 0;
const SNAP_CLOSED = window.innerHeight * 0.6 - 80; // 핸들만 보이는 높이

export default function DirectionsView() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;

  const sheetRef = useRef(null);
  // ref로만 관리 → 클로저 캡처 문제 없음
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startTransRef = useRef(0); // 드래그 시작 시점의 translateY

  const [currentY, setCurrentY] = useState(SNAP_OPEN); // 현재 스냅 위치 (UI용)

  /** 스냅 포지션으로 애니메이션 이동 */
  const snapTo = useCallback((y) => {
    if (!sheetRef.current) return;
    sheetRef.current.style.transition =
      "transform 0.4s cubic-bezier(0.32,0.72,0,1)";
    sheetRef.current.style.transform = `translateY(${y}px)`;
    setCurrentY(y);
  }, []);

  if (!restaurant) return null;
  const { name, image, walkingMinutes, distanceKm, carMinutes } = restaurant;

  /** sheet에 translateY 직접 적용 (애니메이션 없이) */
  const setTranslate = (y) => {
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
      sheetRef.current.style.transform = `translateY(${y}px)`;
    }
  };

  const handlePointerDown = (e) => {
    if (!sheetRef.current) return;

    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startTransRef.current = currentY; // 현재 위치에서 시작

    sheetRef.current.setPointerCapture(e.pointerId);
    // 드래그 중엔 transition 제거
    sheetRef.current.style.transition = "none";
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const deltaY = e.clientY - startYRef.current;
    // 시작 위치 기준으로 이동 → 커서와 시트가 항상 일치
    let nextY = startTransRef.current + deltaY;

    // 위로는 0까지, 아래로는 closed 위치 + 20px 약간 더 내려가는 저항감
    if (nextY < SNAP_OPEN) {
      nextY = SNAP_OPEN - Math.sqrt(-nextY) * 2; // 위쪽 고무줄 효과
    } else if (nextY > SNAP_CLOSED) {
      nextY = SNAP_CLOSED + (nextY - SNAP_CLOSED) * 0.2; // 아래쪽 저항
    }

    setTranslate(nextY);
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const deltaY = e.clientY - startYRef.current;
    const velocityY = deltaY; // 간단 속도 (부호만 사용)

    // 현재 위치 기준 스냅 판정
    const rawY = startTransRef.current + deltaY;

    // 빠르게 쓸어올리면 → open, 빠르게 내리면 → closed
    if (velocityY < -50) {
      snapTo(SNAP_OPEN);
    } else if (velocityY > 50) {
      snapTo(SNAP_CLOSED);
    } else {
      // 중간 위치면 가까운 쪽으로
      const mid = SNAP_CLOSED / 2;
      snapTo(rawY < mid ? SNAP_OPEN : SNAP_CLOSED);
    }
  };

  return (
    <div className="dv-page">
      <div className="dv-map">
        <img src={mapImg} alt="지도" />
        <button className="dv-back-btn" onClick={() => navigate(-1)}>
          <img src="/icons/back.png" alt="뒤로" />
        </button>
      </div>

      <div
        ref={sheetRef}
        className="dv-sheet"
        style={{ transform: `translateY(${SNAP_OPEN}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="dv-sheet-handle" />

        <div className="dv-restaurant-img">
          <img
            src={image || "/empty-store2.svg"}
            alt={name}
            onError={(e) => {
              e.currentTarget.src = "/empty-store2.svg";
            }}
          />
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

          <p className="dv-walk">
            도보 {walkingMinutes}분 • {distanceKm}km
          </p>
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
