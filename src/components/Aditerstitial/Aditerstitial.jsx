import { useEffect, useRef, useState } from "react";
import { getRandomAd, postAdView } from "../../apis/adApi";
import styles from "./Aditerstitial.module.scss";

const AD_DURATION_MS = 10000;

export default function AdInterstitial({ onClose }) {
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const [canClose, setCanClose] = useState(false);
  const [remaining, setRemaining] = useState(AD_DURATION_MS / 1000);
  const [adData, setAdData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getRandomAd()
      .then((res) => setAdData(res.data))
      .catch(() => setError(true));

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerRef.current = setTimeout(() => {
      setCanClose(true);
    }, AD_DURATION_MS);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleClose = async () => {
    if (adData) {
      try {
        await postAdView({ advertisementId: 3, completed: true });
      } catch (err) {
        console.error("광고 시청 기록 실패:", err);
      }
    }
    onClose?.();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.adBox}>
        {error ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: "#888",
            }}
          >
            광고를 불러올 수 없습니다.
          </div>
        ) : adData ? (
          <video
            src={adData.videoUrl}
            autoPlay
            muted
            playsInline
            controls
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: "#888",
            }}
          >
            로딩 중...
          </div>
        )}
        <button
          className={`${styles.closeBtn} ${canClose ? styles.active : styles.disabled}`}
          onClick={canClose ? handleClose : undefined}
        >
          {canClose ? "✕ 닫기" : `${remaining}초 후 닫기`}
        </button>
      </div>
    </div>
  );
}
