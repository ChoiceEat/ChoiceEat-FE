import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RESTAURANTS } from "../../data/restaurants";
import BalanceCard from "./BalanceCard";
import ValueCard from "./ValueCard";
import QualityCard from "./QualityCard";
import "./selectCardPage.scss";
import "./cards.scss";

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

  const handleAdClick = () => {
    alert("광고 기능은 준비 중입니다.");
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
    <div className="scp-page" {...dragProps}>
      {/* ── TOP: 헤더·탭·캐릭터 (max 393px 중앙) ── */}
      <div className="scp-top">
        <header className="scp-header">
          <span className="scp-logo">Choice Eat</span>
        </header>

        <nav className="scp-nav">
          {LABELS.map((label, i) => (
            <button
              key={i}
              className={`scp-nav__item${i === idx ? " scp-nav__item--active" : ""}`}
              onClick={() => setIdx(i)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="scp-char">
          <img src="/char-vibe.svg" alt="" draggable={false} />
        </div>
      </div>

      {/* ── CAROUSEL: full viewport width ── */}
      <div
        className={`scp-carousel${verticalDrag < 0 || launching ? " scp-carousel--lifting" : ""}`}
        ref={carouselRef}
      >
        <button
          className="scp-arrow scp-arrow--left"
          onClick={() => idx > 0 && setIdx((i) => i - 1)}
          disabled={idx === 0}
          aria-label="이전"
        >
          <img src="/icons/arrow-left.png" alt="이전" draggable={false} />
        </button>

        <div
          className={`scp-track${animated ? " scp-track--anim" : ""}`}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {TYPES.map((type, i) => {
            const isActive = i === idx;
            return (
              <div
                key={type}
                className={`scp-slide${isActive ? " scp-slide--active" : " scp-slide--inactive"}`}
                style={{ width: CARD_W, ...(isActive ? activeCardStyle : {}) }}
              >
                {i === 0 && (
                  <ValueCard
                    activeTags={activeTags.value}
                    onTagClick={(tag) => handleTagClick("value", tag)}
                  />
                )}
                {i === 1 && (
                  <BalanceCard
                    activeTags={activeTags.balance}
                    onTagClick={(tag) => handleTagClick("balance", tag)}
                  />
                )}
                {i === 2 && (
                  <QualityCard
                    activeTags={activeTags.quality}
                    onTagClick={(tag) => handleTagClick("quality", tag)}
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          className="scp-arrow scp-arrow--right"
          onClick={() => idx < 2 && setIdx((i) => i + 1)}
          disabled={idx === 2}
          aria-label="다음"
        >
          <img src="/icons/arrow-right.png" alt="다음" draggable={false} />
        </button>
      </div>

      {/* ── FOOTER: 스와이프 힌트·광고버튼 (max 393px 중앙) ── */}
      <div className="scp-footer">
        <div className="scp-swipe-hint">
          <div className="scp-swipe-hint__arrow">↑</div>
          <div className="scp-swipe-hint__text">위로 밀어서 선택</div>
        </div>
        <div className="scp-bottom">
          <p className="scp-bottom__hint">마음에 들지 않는다면?</p>
          <button className="scp-bottom__ad" onClick={handleAdClick}>
            광고 시청 후 다시 뽑기
          </button>
        </div>
      </div>
    </div>
  );
}
