import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { RESTAURANTS } from '../../data/restaurants';
import './selectCard.scss';

const TYPES = ['value', 'balance', 'quality'];
const LABELS = ['가성비 픽', '밸런스 픽', '퀄리티 픽'];
const SWIPE_THRESHOLD = 48;
const DESKTOP_BP = 768;

export default function SelectCard() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [offset, setOffset] = useState(0);
  const [slideW, setSlideW] = useState(0);
  const [ready, setReady] = useState(false);
  const [desktop, setDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= DESKTOP_BP : false,
  );
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setDesktop(window.innerWidth >= DESKTOP_BP);
    window.addEventListener('resize', handleResize);

    const rafId = requestAnimationFrame(() => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.getBoundingClientRect().width;
      setSlideW(w);

      requestAnimationFrame(() => setReady(true));

      const obs = new ResizeObserver(([entry]) =>
        setSlideW(entry.contentRect.width)
      );
      obs.observe(wrapRef.current);
      wrapRef._obs = obs;
    });

    return () => {
      cancelAnimationFrame(rafId);
      wrapRef._obs?.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [activeTags, setActiveTags] = useState({
    value:   [...(RESTAURANTS.value.selectedTags   ?? [])],
    balance: [...(RESTAURANTS.balance.selectedTags ?? [])],
    quality: [...(RESTAURANTS.quality.selectedTags ?? [])],
  });

  const dragging = useRef(false);
  const origin   = useRef({ x: 0, y: 0 });
  const axis     = useRef(null);

  const animated     = offset === 0 && ready;
  const translateXpx = -idx * slideW + offset;

  const handleTagClick = useCallback((type, tag) => {
    setActiveTags((prev) => {
      const cur  = prev[type];
      const next = cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag];
      return { ...prev, [type]: next };
    });
  }, []);

  const startDrag = useCallback((x, y) => {
    dragging.current = true;
    axis.current     = null;
    origin.current   = { x, y };
  }, []);

  const moveDrag = useCallback((x, y) => {
    if (!dragging.current) return;
    const dx = x - origin.current.x;
    const dy = y - origin.current.y;
    if (!axis.current && (Math.abs(dx) > 5 || Math.abs(dy) > 5))
      axis.current = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
    if (axis.current === 'h') setOffset(dx);
  }, []);

  const endDrag = useCallback(
    (x) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = x - origin.current.x;
      setOffset(0);
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (dx < 0 && idx < 2) setIdx((i) => i + 1);
      if (dx > 0 && idx > 0) setIdx((i) => i - 1);
    },
    [idx],
  );

  return (
    <div className={`sc-page${desktop ? ' sc-page--wide' : ''}`}>
      <div className="sc-phone">

        {/* ── Header ── */}
        <header className="sc-header">
          <button className="sc-header__back" onClick={() => navigate(-1)} aria-label="뒤로">
            <img src="/icons/back.svg" alt="뒤로" />
          </button>
          <span className="sc-header__title">Choice Eat</span>
          <div className="sc-header__actions">
            <button className="sc-header__icon" aria-label="검색">
              <img src="/icons/search.svg" alt="검색" />
            </button>
            <button className="sc-header__icon" aria-label="프로필">
              <img src="/icons/profile.svg" alt="프로필" />
            </button>
          </div>
        </header>

        {/* ── Category ── */}
        <nav className="sc-category">
          {LABELS.map((label, i) => (
            <button
              key={i}
              className={`sc-category__item${i === idx ? ' sc-category__item--active' : ''}`}
              onClick={() => setIdx(i)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* ── Character ── */}
        <div className="sc-char" aria-hidden="true">
          <img src="/char-pic.png" alt="" />
        </div>

        {/* ── Carousel ── */}
        <div
          className="sc-carousel-outer"
          onMouseDown={(e)  => startDrag(e.clientX, e.clientY)}
          onMouseMove={(e)  => moveDrag(e.clientX, e.clientY)}
          onMouseUp={(e)    => endDrag(e.clientX)}
          onMouseLeave={(e) => endDrag(e.clientX)}
          onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e)  => moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={(e)   => endDrag(e.changedTouches[0].clientX)}
        >
          <button
            className="sc-arrow sc-arrow--left"
            onClick={() => idx > 0 && setIdx((i) => i - 1)}
            disabled={idx === 0}
            aria-label="이전"
          >
            ‹
          </button>

          <div className="sc-track-wrap" ref={wrapRef}>
            <div
              className={`sc-track${animated ? ' sc-track--animated' : ''}`}
              style={{ transform: `translateX(${translateXpx}px)` }}
            >
              {TYPES.map((type, i) => (
                <div
                  key={type}
                  className={`sc-slide${i === idx ? ' sc-slide--active' : ' sc-slide--inactive'}`}
                  style={{ width: slideW || '100%' }}
                >
                  <Card
                    restaurant={RESTAURANTS[type]}
                    type={type}
                    activeTags={activeTags[type]}
                    onTagClick={(tag) => handleTagClick(type, tag)}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="sc-arrow sc-arrow--right"
            onClick={() => idx < 2 && setIdx((i) => i + 1)}
            disabled={idx === 2}
            aria-label="다음"
          >
            ›
          </button>
        </div>

        {/* ── Bottom ── */}
        <div className="sc-bottom">
          <p className="sc-bottom__hint">마음에 들지 않는다면?</p>
          <button className="sc-bottom__btn">광고 시청 후 다시 뽑기</button>
        </div>

      </div>
    </div>
  );
}