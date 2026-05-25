// src/components/AdInterstitial.jsx
import { useEffect, useRef, useState } from "react";
import { postAdView } from "../../apis/adApi";
import styles from "./Aditerstitial.module.scss";
// 이 시간이 지나야 닫기 버튼 활성화
const AD_DURATION_MS = 1000; 

export default function AdInterstitial({ onClose }) {
  const timerRef = useRef(null);
  const [canClose, setCanClose] = useState(false); // 닫기 버튼 활성화 여부

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-3940256099942544",
        enable_page_level_ads: true,
      });
    } catch (e) {
      console.warn("AdSense 초기화 실패:", e);
    }

    // 광고 끝까지 시청 후 닫기 버튼 활성화
    timerRef.current = setTimeout(() => {
      setCanClose(true);
    }, AD_DURATION_MS);

    return () => clearTimeout(timerRef.current);
  }, []);

  // 광고 끝까지 시청 후 닫기 버튼 클릭 시에만 API 호출
  const handleClose = async () => {
    try {
      await postAdView({ advertisementId: 3, completed: true });
    } catch (err) {
      console.error("광고 시청 기록 실패:", err);
    }
    onClose?.();
  };

  //구글 공식 테스트용 ID사용.
  return (
    <div className={styles.overlay}>
      <div className={styles.adBox}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-3940256099942544"
          data-ad-slot="1176984568"
          data-ad-format="interstitial"
        />
        <button
          className={`${styles.closeBtn} ${canClose ? styles.active : styles.disabled}`}
          onClick={canClose ? handleClose : undefined}
        >
          ✕ 닫기
        </button>
      </div>
    </div>
  );
}
