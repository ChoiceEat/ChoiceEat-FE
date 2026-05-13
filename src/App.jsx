import { useState, useRef, useCallback } from 'react';
import { RESTAURANTS } from './data/restaurants';
import BalanceCard from './components/BalanceCard';
import ValueCard from './components/ValueCard';
import QualityCard from './components/QualityCard';
import DetailOverlay from './components/DetailOverlay';
import DirectionsView from './components/DirectionsView';
import ConfirmComplete from './components/ConfirmComplete';
import './styles/cards.css';

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
  const [cardType, setCardType] = useState('balance');
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [verticalDrag, setVerticalDrag] = useState(0);
  const [launching, setLaunching] = useState(false);

  const dragging = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const axis = useRef(null);

  const selectedRestaurant = RESTAURANTS[cardType] ?? RESTAURANTS.balance;
  const translateX = -idx * 100 + (offset / window.innerWidth) * 100;

  const dragProgress = verticalDrag < 0 ? Math.min(Math.abs(verticalDrag) / 280, 1) : 0;
  const liftScale = 1 - dragProgress * 0.08;
  const activeCardStyle = launching
    ? {
        transform: 'translateY(-110vh) scale(0.84)',
        opacity: 0,
        transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.8, 0.5), opacity 0.28s ease-in',
        pointerEvents: 'none',
      }
    : verticalDrag < 0
    ? {
        transform: `translateY(${verticalDrag * 0.75}px) scale(${liftScale})`,
        transition: 'none',
      }
    : {
        transform: 'translateY(0px) scale(1)',
        transition: 'transform 0.52s cubic-bezier(0.34, 1.56, 0.64, 1)',
      };

  const handleClose = () => {
    setDetailOpen(false);
  };

  const handleConfirm = () => {
    setDetailOpen(false);
    setConfirmOpen(true);
  };

  const handleRestart = () => {
    setConfirmOpen(false);
    setDetailOpen(false);
    setDirectionsOpen(false);
    setCardType('balance');
    setIdx(INITIAL_IDX);
  };

  const handleDirections = () => {
    setDirectionsOpen(true);
  };

  const handleDirectionsBack = () => {
    setDirectionsOpen(false);
  };

  const startDrag = useCallback((x, y) => {
    if (confirmOpen || detailOpen) return;

    dragging.current = true;
    axis.current = null;
    origin.current = { x, y };
  }, [confirmOpen, detailOpen]);

  const moveDrag = useCallback((x, y) => {
    if (!dragging.current) return;

    const dx = x - origin.current.x;
    const dy = y - origin.current.y;

    if (!axis.current) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        axis.current = Math.abs(dx) >= Math.abs(dy) ? 'h' : 'v';
      }
    }

    if (axis.current === 'h') {
      setOffset(dx);
    } else if (axis.current === 'v') {
      setVerticalDrag(dy < 0 ? dy : 0);
    }
  }, []);

  const endDrag = useCallback((x, y) => {
    if (!dragging.current) return;

    dragging.current = false;

    const dx = x - origin.current.x;
    const dy = y - origin.current.y;

    setOffset(0);

    if (dy < -SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
      const currentType = cardTypeMap[idx];
      setCardType(currentType);
      setLaunching(true);
      setDetailOpen(true);
      setTimeout(() => {
        setLaunching(false);
        setVerticalDrag(0);
      }, 420);
      return;
    }

    setVerticalDrag(0);

    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) {
      return;
    }

    if (dx < 0 && idx < 2) {
      setIdx(i => i + 1);
      setCardType(cardTypeMap[idx + 1]);
    }

    if (dx > 0 && idx > 0) {
      setIdx(i => i - 1);
      setCardType(cardTypeMap[idx - 1]);
    }
  }, [idx]);

  const swipeHint = offset < -20 ? 'left' : offset > 20 ? 'right' : null;

  if (confirmOpen) {
    return (
      <ConfirmComplete
        restaurant={selectedRestaurant}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div
      className="swipe-app"
      onMouseDown={e => startDrag(e.clientX, e.clientY)}
      onMouseMove={e => moveDrag(e.clientX, e.clientY)}
      onMouseUp={e => endDrag(e.clientX, e.clientY)}
      onMouseLeave={e => endDrag(e.clientX, e.clientY)}
      onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={e => {
        e.preventDefault();
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={e => endDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
    >
      {idx === 0 && (
        <div className={`global-hint right${swipeHint === 'right' ? ' hinting' : ''}`}>
          <div className="global-hint__arrows">»</div>
          <div className="global-hint__label">밸런스</div>
        </div>
      )}

      {idx === 1 && (
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

      {idx === 2 && (
        <div className={`global-hint left${swipeHint === 'left' ? ' hinting' : ''}`}>
          <div className="global-hint__arrows">«</div>
          <div className="global-hint__label">밸런스</div>
        </div>
      )}

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
        open={detailOpen}
        restaurant={selectedRestaurant}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onDirections={handleDirections}
      />

      <DirectionsView
        open={directionsOpen}
        restaurant={selectedRestaurant}
        onBack={handleDirectionsBack}
      />

      <div
        className={`cards-track${offset === 0 ? ' animated' : ''}`}
        style={{ transform: `translateX(${translateX}vw)` }}
      >
        <div className="card-slide" style={idx === 0 ? activeCardStyle : {}}>
          <ValueCard />
        </div>

        <div className="card-slide" style={idx === 1 ? activeCardStyle : {}}>
          <BalanceCard />
        </div>

        <div className="card-slide" style={idx === 2 ? activeCardStyle : {}}>
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