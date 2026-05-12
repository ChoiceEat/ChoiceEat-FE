import { useState, useRef, useCallback } from 'react';
import BalanceCard from './components/BalanceCard';
import ValueCard from './components/ValueCard';
import QualityCard from './components/QualityCard';
import DetailOverlay from './components/DetailOverlay';
import './styles/cards.css';

/*
 * 물리적 카드 순서 (왼쪽 → 오른쪽):
 *   [가성비(0)]  [밸런스(1)]  [퀄리티(2)]
 *
 * 왼쪽 스와이프 → idx 2 (가성비)
 * 오른쪽 스와이프 → idx 0 (퀄리티)
 */

const CARDS = [
  { label: '가성비 픽' },
  { label: '밸런스 픽' },
  { label: '퀄리티 픽' },
];

const INITIAL_IDX = 1;
const SWIPE_THRESHOLD = 48;
const cardTypeMap = { 0: 'value', 1: 'balance', 2: 'quality' };

export default function App() {
  const [idx, setIdx] = useState(INITIAL_IDX);
  const [offset, setOffset] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayCard, setOverlayCard] = useState('balance');

  const dragging = useRef(false);
  const origin   = useRef({ x: 0, y: 0 });
  const axis     = useRef(null);

  const translateX = -idx * 100 + (offset / window.innerWidth) * 100;

  const startDrag = useCallback((x, y) => {
    dragging.current = true;
    axis.current     = null;
    origin.current   = { x, y };
  }, []);

  const moveDrag = useCallback((x, y) => {
    if (!dragging.current) return;
    const dx = x - origin.current.x;
    const dy = y - origin.current.y;

    if (!axis.current) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        axis.current = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
      }
    }
    if (axis.current === 'h') setOffset(dx);
  }, []);

  const endDrag = useCallback((x, y) => {
    if (!dragging.current) return;
    dragging.current = false;

    const dx = x - origin.current.x;
    const dy = y - origin.current.y;
    setOffset(0);

    if (dy < -SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
      setOverlayCard(cardTypeMap[idx]);
      setOverlayOpen(true);
      return;
    }

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return;

    if (dx < 0 && idx < 2) setIdx(i => i + 1);
    if (dx > 0 && idx > 0) setIdx(i => i - 1);
  }, [idx]);

  const swipeHint = offset < -20 ? 'left' : offset > 20 ? 'right' : null;

  return (
    <div
      className="swipe-app"
      onMouseDown ={e => startDrag(e.clientX, e.clientY)}
      onMouseMove ={e => moveDrag(e.clientX, e.clientY)}
      onMouseUp   ={e => endDrag(e.clientX, e.clientY)}
      onMouseLeave={e => endDrag(e.clientX, e.clientY)}
      onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove ={e => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
      onTouchEnd  ={e => endDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
    >
  

      {idx === 0 && (  // 가성비 화면 — 오른쪽에 밸런스
        <div className={`global-hint right${swipeHint === 'right' ? ' hinting' : ''}`}>
          <div className="global-hint__arrows">»</div>
          <div className="global-hint__label">밸런스</div>
        </div>
      )}

      {idx === 1 && (  // 밸런스 화면 — 양쪽 모두
        <>
          <div className={`global-hint left${swipeHint === 'left' ? ' hinting' : ''}`}>
            <div className="global-hint__arrows">«</div>
            <div className="global-hint__label">가성비</div>
          </div>
          <div className={`global-hint right${swipeHint === 'right' ? ' hinting' : ''}`}>
            <div className="global-hint__arrows">»</div>
            <div className="global-hint__label">퀄리티</div>
          </div>
        </>
      )}


      {idx === 2 && (  // 퀄리티 화면 — 왼쪽에 밸런스
        <div className={`global-hint left${swipeHint === 'left' ? ' hinting' : ''}`}>
          <div className="global-hint__arrows">«</div>
          <div className="global-hint__label">밸런스</div>
        </div>
      )}

      {/* 카드 헤더: 네비 + dots (카드 밖, 트랙 위) */}
      <div className="card-header">
        <nav className="card-nav">
          {CARDS.map((card, i) => {
            const diff = i - idx;
            if (Math.abs(diff) > 1) return null;
            return (
              <div key={i} className="card-nav-row">
                {diff === -1 && <span className="card-nav-arrow">←</span>}
                <span className={`card-nav-label${diff === 0 ? ' current' : ''}`}>
                  {card.label}
                </span>
                {diff === 1 && <span className="card-nav-arrow">→</span>}
              </div>
            );
          })}
        </nav>

        <div className="card-dots">
          {CARDS.map((_, i) => (
            <div key={i} className={`card-dot${i === idx ? ' active' : ''}`} />
          ))}
        </div>
      </div>

      <DetailOverlay
        open={overlayOpen}
        cardType={overlayCard}
        onClose={() => setOverlayOpen(false)}
      />

      {/* 카드 트랙 */}
      <div
        className={`cards-track${offset === 0 ? ' animated' : ''}`}
        style={{ transform: `translateX(${translateX}vw)` }}
      >
        <div className="card-slide">
          <ValueCard />
        </div>
        <div className="card-slide">
          <BalanceCard />
        </div>
        <div className="card-slide">
          <QualityCard />
        </div>
      </div>
    
      {idx === 1 && (
        <button className="rewarded-ad-btn">
          <i className="ti ti-player-play" aria-hidden="true" />
          <span>광고 보고 다시 뽑기</span>
          <i className="ti ti-chevron-right" aria-hidden="true" />
        </button>
      )}

    </div>
  );
}