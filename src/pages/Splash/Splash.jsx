import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../hooks/useSurvey";
import styles from "./Splash.module.scss";

export default function Splash() {
  const navigate = useNavigate();
  const { resetAnswers } = useSurvey();

  const handleStart = () => {
    resetAnswers(); // 이전 선택값 초기화
    navigate("/step1"); // Step1으로 이동
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoArea}>
        <img
          src="/char-main.png"
          alt="Choice Eat 캐릭터"
          className={styles.charImg}
        />
        <h1 className={styles.appName}>Choice Eat</h1>
        <p className={styles.tagline}>오늘 뭐 먹지? 고민 끝!</p>
      </div>
      <button className={styles.startBtn} onClick={handleStart}>
        시작하기
      </button>
    </div>
  );
}
