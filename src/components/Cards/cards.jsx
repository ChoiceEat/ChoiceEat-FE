import { useState } from 'react';

const FALLBACK_IMG = '/empty-store2.svg';

export default function Card({ image, name, label, desc, meta, status, tags = [], activeTags = [], onTagClick }) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="result-card">
      <div
        className="result-card__image"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <img src={imgSrc} alt="" style={{ display: 'none' }} onError={() => setImgSrc(FALLBACK_IMG)} />
        <div className="result-card__image-overlay" />
        <div className="result-card__image-info">
          <p className="result-card__image-name">{name}</p>
        </div>
      </div>
      <div className="result-card__body">
        <p className="result-card__label">{label}</p>
        <p className="result-card__desc">{desc}</p>
        <div className="result-card__tags">
          {tags.map(tag => (
            <button
              key={tag}
              type="button"
              className={`result-card__tag${activeTags.includes(tag) ? ' result-card__tag--active' : ''}`}
              onClick={e => { e.stopPropagation(); onTagClick?.(tag); }}
            >
              {tag}
            </button>
          ))}
        </div>
        <p className="result-card__meta">{meta}</p>
        <p className="result-card__status">{status}</p>
      </div>
    </div>
  );
}
