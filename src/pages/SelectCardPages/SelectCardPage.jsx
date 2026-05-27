import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RESTAURANTS } from "../../data/restaurants";
import PickCard from "./PickCard";
import AdInterstitial from "../../components/Aditerstitial/Aditerstitial";
import styles from "./SelectCardPage.module.scss";

const TYPES = ["value", "balance", "quality"];
const LABELS = ["가성비 픽", "밸런스 픽", "퀄리티 픽"];
const CARD_W = 275;
const SWIPE_THRESHOLD = 48;
const typeToIdx = { value: 0, balance: 1, quality: 2 };

export default function SelectCardPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialType = state?.selectedType ?? "balance";
  const initialIdx = typeToIdx[initialType] ?? 1;

  const [idx, setIdx] = useState(initialIdx);
  const [offset, setOffset] = useState(0);
  const [verticalDrag, setVerticalDrag] = useState(0);
  const [launching, setLaunching] = useState(false);
  const [containerW, setContainerW] = useState(window.innerWidth);
  const [ready, setReady] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [adWatched, setAdWatched] = useState(state?.adWatched ?? false);

  const [activeTags, setActiveTags] = useState({
    value: [...(RESTAURANTS.value.selectedTags ?? [])],
    balance: [...(RESTAURANTS.balance.selectedTags ?? [])],
    quality: [...(RESTAURANTS.quality.selectedTags ?? [])],
  });

  const carouselRef = useRef(null);
  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const axis = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (!carouselRef.current) return;
      setContainerW(carouselRef.current.getBoundingClientRect().width);
    };
    const raf = requestAnimationFrame(() => {
      measure();
      requestAnimationFrame(() => setReady(true));
    });
    const obs = new ResizeObserver(measure);
    if (carouselRef.current) obs.observe(carouselRef.current);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, []);

  const centerOffset = (containerW - CARD_W) / 2;
  const translateX = -(idx * CARD_W) + centerOffset + offset;
  const animated = offset === 0 && ready;

  const dragProgress =
    verticalDrag < 0 ? Math.min(Math.abs(verticalDrag) / 280, 1) : 0;
  const liftScale = 1 - dragProgress * 0.08;

  const activeCardStyle = launching
    ? {
        transform: "translateY(-110vh) scale(0.84)",
        opacity: 0,
        transition:
          "transform 0.38s cubic-bezier(0.4,0,0.8,0.5), opacity 0.28s ease-in",
        pointerEvents: "none",
      }
    : verticalDrag < 0
      ? {
          transform: `translateY(${verticalDrag * 0.75}px) scale(${liftScale})`,
          transition: "none",
        }
      : {
          transform: "translateY(0px) scale(1)",
          transition: "transform 0.52s cubic-bezier(0.34,1.56,0.64,1)",
        };

  const handleTagClick = useCallback((type, tag) => {
    setActiveTags((prev) => {
      const cur = prev[type];
      const next = cur.includes(tag)
        ? cur.filter((t) => t !== tag)
        : [...cur, tag];
      return { ...prev, [type]: next };
    });
  }, []);

  const startDrag = useCallback((x, y) => {
    dragging.current = true;
    axis.current = null;
    origin.current = { x, y };
  }, []);

  const moveDrag = useCallback((x, y) => {
    if (!dragging.current) return;
    const dx = x - origin.current.x;
    const dy = y - origin.current.y;
    if (!axis.current && (Math.abs(dx) > 5 || Math.abs(dy) > 5))
      axis.current = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
    if (axis.current === "h") setOffset(dx);
    else if (axis.current === "v") setVerticalDrag(dy < 0 ? dy : 0);
  }, []);

  const endDrag = useCallback(
    (x, y) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = x - origin.current.x;
      const dy = y - origin.current.y;
      setOffset(0);

      if (dy < -SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
        setLaunching(true);
        setTimeout(() => {
          setLaunching(false);
          setVerticalDrag(0);
          navigate("/detail", {
            state: { restaurant: RESTAURANTS[TYPES[idx]], fromRecommend: true },
          });
        }, 380);
        return;
      }
      setVerticalDrag(0);

      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0 && idx < 2) setIdx((i) => i + 1);
      if (dx > 0 && idx > 0) setIdx((i) => i - 1);
    },
    [idx, navigate],
  );

  // 광고 버튼 클릭 → 광고 노출
  const handleAdClick = () => {
    setShowAd(true);
  };

  // 광고 닫힘 → 다시 뽑기 실행
  const handleAdClose = () => {
    setShowAd(false);
    setAdWatched(true);
    navigate("/pick", {
      state: {
        activeTags,
        selectedType: TYPES[idx],
        adWatched: true,
      },
    });
  };

  const dragProps = {
    onMouseDown: (e) => startDrag(e.clientX, e.clientY),
    onMouseMove: (e) => moveDrag(e.clientX, e.clientY),
    onMouseUp: (e) => endDrag(e.clientX, e.clientY),
    onMouseLeave: (e) => endDrag(e.clientX, e.clientY),
    onTouchStart: (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY),
    onTouchMove: (e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY),
    onTouchEnd: (e) =>
      endDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY),
  };

  return (
    <div className={styles.page} {...dragProps}>
      {/* 광고 전면 노출 */}
      {showAd && <AdInterstitial onClose={handleAdClose} />}

      <div className={styles.top}>
        <header className={styles.header}>
          <span className={styles.logo}>Choice Eat</span>
        </header>

        <nav className={styles.nav}>
          {LABELS.map((label, i) => (
            <button
              key={i}
              className={`${styles.navItem}${i === idx ? ` ${styles.navItemActive}` : ""}`}
              onClick={() => setIdx(i)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.char}>
          <img src="/char-vibe.svg" alt="" draggable={false} />
        </div>
      </div>

      <div
        className={`${styles.carousel}${verticalDrag < 0 || launching ? ` ${styles.carouselLifting}` : ""}`}
        ref={carouselRef}
      >
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => idx > 0 && setIdx((i) => i - 1)}
          disabled={idx === 0}
          aria-label="이전"
        >
          <img src="/icons/arrow-left.png" alt="이전" draggable={false} />
        </button>

        <div
          className={`${styles.track}${animated ? ` ${styles.trackAnim}` : ""}`}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {TYPES.map((type, i) => {
            const isActive = i === idx;
            return (
              <div
                key={type}
                className={`${styles.slide}${isActive ? ` ${styles.slideActive}` : ` ${styles.slideInactive}`}`}
                style={{ width: CARD_W, ...(isActive ? activeCardStyle : {}) }}
              >
                <PickCard
                  type={type}
                  activeTags={activeTags[type]}
                  onTagClick={(tag) => handleTagClick(type, tag)}
                  isActive={isActive}
                />
              </div>
            );
          })}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => idx < 2 && setIdx((i) => i + 1)}
          disabled={idx === 2}
          aria-label="다음"
        >
          <img src="/icons/arrow-right.png" alt="다음" draggable={false} />
        </button>
      </div>

      <div className={styles.footer}>
        <div className={styles.swipeHint}>
          <div className={styles.swipeHintArrow}>↑</div>
          <div className={styles.swipeHintText}>위로 밀어서 선택</div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.bottomHint}>마음에 들지 않는다면?</p>
          {!adWatched && (
            <button className={styles.bottomAd} onClick={handleAdClick}>
              광고 시청 후 다시 뽑기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
