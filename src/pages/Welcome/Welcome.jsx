import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.scss";
import WelcomeImg from "../../assets/welcome-img.svg";
import { useAuth } from "../../hooks/useAuth";
import { useSurvey } from "../../hooks/useSurvey";

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const nickname = user?.nickname ?? "";
  const { resetAnswers } = useSurvey();

  useEffect(() => {
    resetAnswers();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.topText}>반가워요 {nickname}님!</p>
      <div className={styles.contentArea}>
        <img src={WelcomeImg} alt="welcome" className={styles.mainImg} />
        <p className={styles.desc}>
          초이스 잇이 {nickname}님의 먹거리 고민을 위해
          <br />
          몇가지 질문할게요!
        </p>
      </div>
      <button className={styles.btn} onClick={() => navigate("/step1")}>
        답변하러 가기
      </button>
    </div>
  );
}
