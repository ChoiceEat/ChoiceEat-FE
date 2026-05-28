import { useState } from "react";
import styles from "./cards.module.scss";

const FALLBACK_IMG = "/empty-store2.png";

export default function Card({
  image,
  name,
  label,
  desc,
  meta,
  status,
  tags = [],
  activeTags = [],
  onTagClick,
  isActive = false,
}) {
  const [imgSrc, setImgSrc] = useState(image || FALLBACK_IMG);

  return (
    <div className={`${styles.card}${isActive ? ` ${styles.floating}` : ""}`}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <img
          src={imgSrc}
          alt=""
          style={{ display: "none" }}
          onError={() => setImgSrc(FALLBACK_IMG)}
        />
        <div className={styles.imageOverlay} />
        <div className={styles.imageInfo}>
          <p className={styles.imageName}>{name}</p>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.label}>{label}</p>
        <p className={styles.desc}>{desc}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.tag}${activeTags.includes(tag) ? ` ${styles.tagActive}` : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick?.(tag);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        <p className={styles.meta}>{meta}</p>
        <p className={styles.status}>{status}</p>
      </div>
    </div>
  );
}
