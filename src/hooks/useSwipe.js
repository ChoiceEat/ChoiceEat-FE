import { useEffect, useCallback } from "react";

/**
 * 양방향 스와이프 훅
 * onSwipeLeft  : 왼쪽으로 스와이프 → 다음 페이지
 * onSwipeRight : 오른쪽으로 스와이프 → 이전 페이지
 */
export function useSwipe(onSwipeLeft, onSwipeRight) {
  const handleSwipeLeft = useCallback(() => onSwipeLeft?.(), [onSwipeLeft]);
  const handleSwipeRight = useCallback(() => onSwipeRight?.(), [onSwipeRight]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    // 손가락을 화면에 올렸을 때 시작 위치 기록
    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    // 손가락을 뗐을 때 얼마나 이동했는지 계산
    const onTouchEnd = (e) => {
      const diffX = e.changedTouches[0].clientX - startX;
      const diffY = Math.abs(e.changedTouches[0].clientY - startY);

      // 세로로 많이 움직였으면 스크롤로 판단하고 무시
      if (diffY > 60) return;

      if (diffX < -60) handleSwipeLeft(); // 왼쪽으로 60px 이상 → 다음
      if (diffX > 60) handleSwipeRight(); // 오른쪽으로 60px 이상 → 이전
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    // 페이지를 벗어날 때 이벤트 리스너 제거 (메모리 누수 방지)
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleSwipeLeft, handleSwipeRight]);
}
