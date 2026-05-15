import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSwipe } from "../../hooks/useSwipe";
import { useSurvey } from "../../hooks/useSurvey";
import styles from "./SelectionStep.module.scss";

export default function SelectionStep({
  stepNumber, // 스텝 번호 (1, 2, 3)
  title, // 상단 제목 텍스트
  options, // 선택지 배열 ['한식', '중식', ...]
  selected, // 현재 선택된 값
  onSelect, // 선택했을 때 실행할 함수
  prevPath, // 이전 페이지 경로
  nextPath, // 다음 페이지 경로
  charImg, // 상단 캐릭터 이미지 경로
  speechText, // 말풍선 텍스트
  manualNext, // true면 선택해도 자동으로 안 넘어감 (Step3용)
}) {
  const navigate = useNavigate();
  const { isSearchable } = useSurvey();

  const location = useLocation();

  const targetProgress = (stepNumber / 3) * 100;
  const prevProgress = ((stepNumber - 1) / 3) * 100;

  // state로 방향 전달 (없으면 앞으로 가는 방향으로 간주)
  const isGoingBack = location.state?.direction === "back";

  const [progressWidth, setProgressWidth] = useState(
    isGoingBack ? targetProgress : prevProgress, // 뒤로: 현재값에서 시작, 앞으로: 이전값에서 시작
  );

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setProgressWidth(isGoingBack ? prevProgress : targetProgress);
    });
    return () => cancelAnimationFrame(raf);
  }, [targetProgress, isGoingBack, prevProgress]);

  // 다음 페이지로 이동
  const goNext = () => {
    if (manualNext) {
      // Step3: isSearchable()이 true일 때만 이동
      if (isSearchable()) navigate(nextPath);
    } else {
      // Step1, 2: 무조건 이동
      navigate(nextPath);
    }
  };

  // 이전 페이지로 이동
  const goPrev = () => {
    if (prevPath) navigate(prevPath, { state: { direction: "back" } });
  };

  // 스와이프 연결
  useSwipe(goNext, goPrev);

  const handleSelect = (value) => {
    // 이미 선택된 값을 다시 클릭하면 null로 취소
    const newValue = selected === value ? null : value;
    onSelect(newValue);
    if (!manualNext && newValue !== null) {
      setTimeout(() => navigate(nextPath), 500);
    }
  };

  return (
    <div className={styles.container}>
      {/* ── 상단 초록색 영역 ── */}
      <div className={styles.topSection}>
        {/* 뒤로가기 버튼 (prevPath가 있을 때만 표시) */}
        {prevPath && (
          <button className={styles.backBtn} onClick={goPrev}>
            ←
          </button>
        )}

        <h2 className={styles.topTitle}>{title}</h2>

        <img src={charImg} alt="캐릭터" className={styles.charImg} />

        {/* 프로그레스 바 */}
        <div className={styles.progressArea}>
          <div className={styles.stepHeader}>
            <span className={styles.stepLabel}>STEP {stepNumber}</span>
            <span
              className={`${styles.finish} ${stepNumber === 3 ? styles.finishActive : ""}`}
            >
              FINISH
            </span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>

        {/* 말풍선 */}
        <div className={styles.speechBubble}>
          <p>{speechText}</p>
        </div>
      </div>

      {/* ── 하단 흰색 영역 ── */}
      <div className={styles.bottomSection}>
        <h3 className={styles.questionTitle}>
          {stepNumber}. {title}
        </h3>

        <div className={styles.options}>
          {options.map((label) => (
            <button
              key={label}
              className={`${styles.optBtn} ${selected === label ? styles.active : ""}`}
              onClick={() => handleSelect(label)}
            >
              <span className={styles.checkIcon}>✓</span>
              {label}
            </button>
          ))}
        </div>

        {/* Step3 전용 검색하기 버튼 */}
        {manualNext && (
          <button
            className={`${styles.searchBtn} ${isSearchable() ? styles.searchActive : ""}`}
            onClick={goNext}
            disabled={!isSearchable()}
          >
            검색하기
          </button>
        )}
      </div>
    </div>
  );
}
