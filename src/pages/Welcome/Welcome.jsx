import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.scss";
import WelcomeTop from "../../assets/welcome-top.svg";
import WelcomeImg from "../../assets/welcome-img.svg";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={WelcomeTop} alt="반가워요 00님!" className={styles.topText} />
      <img src={WelcomeImg} alt="welcome" className={styles.mainImg} />
      <p className={styles.desc}>
        초이스 잇이 ㅇㅇ님의 먹거리 고민을 위해
        <br />
        몇가지 질문할게요!
      </p>
      <button className={styles.btn} onClick={() => navigate("/step1")}>
        질문하러 가기
      </button>
    </div>
  );
}
