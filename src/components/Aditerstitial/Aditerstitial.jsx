// src/components/AdInterstitial.jsx
import { useEffect, useRef, useState } from "react";
import { postAdView } from "../../apis/adApi";
import styles from "./Aditerstitial.module.scss";

const AD_DURATION_MS = 10000; // 10초 후 닫기 버튼 활성화
const AD_VIDEOS = [
  "/dummy/dummy-ad-1.mp4",
  "/dummy/dummy-ad-2.mp4",
  "/dummy/dummy-ad-3.mp4",
  "/dummy/dummy-ad-4.mp4",
];

const getRandomVideo = () => AD_VIDEOS[Math.floor(Math.random() * AD_VIDEOS.length)];

export default function AdInterstitial({ onClose }) {
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const [canClose, setCanClose] = useState(false);
  const [remaining, setRemaining] = useState(AD_DURATION_MS / 1000);
  const [videoSrc] = useState(getRandomVideo); // 마운트 시 1번만 랜덤 선택
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch((e) => console.warn("자동재생 실패:", e));
    }
    // 카운트다운
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 10초 후 닫기 버튼 활성화
    timerRef.current = setTimeout(() => {
      setCanClose(true);
    }, AD_DURATION_MS);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  // 10초 후 닫기 클릭 시 API 호출
  const handleClose = async () => {
    try {
      await postAdView({ advertisementId: 3, completed: true });
    } catch (err) {
      console.error("광고 시청 기록 실패:", err);
    }
    onClose?.();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.adBox}>
        {/* 더미 광고 영상 - AdSense 연동 시 아래 video를 <ins> 태그로 교체 */}
        <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        controls
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-3940256099942544"
          data-ad-slot="1176984568"
          data-ad-format="interstitial"
        /> */}
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
