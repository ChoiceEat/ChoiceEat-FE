import { useRef, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import KakaoMap from "../../components/KakaoMap/KakaoMap";
//import mapImg from "../../assets/map.png";
import "./DirectionsView.module.scss";
import styles from "./DirectionsView.module.scss";

const SNAP_OPEN = 0;

export default function DirectionsView() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const restaurant = state?.restaurant;
  const SNAP_CLOSED = useMemo(() => window.innerHeight * 0.6 - 80, []);

  
  const sheetRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startTransRef = useRef(0);

  const [currentY, setCurrentY] = useState(SNAP_OPEN);

  const snapTo = useCallback((y) => {
    if (!sheetRef.current) return;
    sheetRef.current.style.transition =
      "transform 0.4s cubic-bezier(0.32,0.72,0,1)";
    sheetRef.current.style.transform = `translateY(${y}px)`;
    setCurrentY(y);
  }, []);

  if (!restaurant) return null;
  const { name, image, walkingMinutes, distanceKm, carMinutes, lat, lng } = restaurant;

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
    startTransRef.current = currentY;
    sheetRef.current.setPointerCapture(e.pointerId);
    sheetRef.current.style.transition = "none";
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaY = e.clientY - startYRef.current;
    let nextY = startTransRef.current + deltaY;
    if (nextY < SNAP_OPEN) {
      nextY = SNAP_OPEN - Math.sqrt(-nextY) * 2;
    } else if (nextY > SNAP_CLOSED) {
      nextY = SNAP_CLOSED + (nextY - SNAP_CLOSED) * 0.2;
    }
    setTranslate(nextY);
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const deltaY = e.clientY - startYRef.current;
    const velocityY = deltaY;
    const rawY = startTransRef.current + deltaY;
    if (velocityY < -50) {
      snapTo(SNAP_OPEN);
    } else if (velocityY > 50) {
      snapTo(SNAP_CLOSED);
    } else {
      const mid = SNAP_CLOSED / 2;
      snapTo(rawY < mid ? SNAP_OPEN : SNAP_CLOSED);
    }
  };

  return (
    <div className="dv-page">
      <div className="dv-map">
        <KakaoMap lat={lat} lng={lng} />
        <button className="dv-back-btn" onClick={() => navigate(-1)}>
          <img src="/icons/back.png" alt="뒤로" />
        </button>
      </div>

      <div
        ref={sheetRef}
        className={styles.sheet}
        style={{ transform: `translateY(${SNAP_OPEN}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className={styles.sheetHandle} />

        <div className={styles.restaurantImg}>
          <img
            src={image || "/empty-store2.svg"}
            alt={name}
            onError={(e) => {
              e.currentTarget.src = "/empty-store2.svg";
            }}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h2 className={styles.name}>{name}</h2>
            <button className={styles.moreBtn}>···</button>
          </div>

          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.dotActive}`} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>

          <p className={styles.walk}>
            도보 {walkingMinutes}분 • {distanceKm}km
          </p>
          <p className={styles.car}>예상 소요: 자동차 {carMinutes}분</p>
        </div>

        <div className={styles.btns}>
          <button className={styles.navBtn}>
            <img src="/icons/direction.png" alt="" />
            길찾기
          </button>
        </div>
      </div>
    </div>
  );
}
