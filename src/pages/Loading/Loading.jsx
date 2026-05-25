import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSurvey } from "../../hooks/useSurvey";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Loading.module.scss";

export default function Loading() {
  const navigate = useNavigate();
  const { answers } = useSurvey();
  const { user } = useAuth();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // TODO: 나중에 실제 API 호출로 교체
        // const res = await fetch('/api/recommend', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(answers),
        // })
        // const data = await res.json()
        // navigate('/result', { state: { result: data } })

        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/pick", { state: { answers } });
      } catch (err) {
        console.error("API 호출 실패:", err);
      }
    };

    fetchResult();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.spinnerWrap}>
        <div className={styles.spinner} />
        <p className={styles.subText}>잠시만 기다려 주세요...</p>
        <p className={styles.mainText}>
          {user?.nickname ?? "OO"}님께 꼭 맞는 메뉴를
          <br />
          초이스 하고 있어요!
        </p>
      </div>
    </div>
  );
}
