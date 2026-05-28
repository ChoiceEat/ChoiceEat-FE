import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSurvey } from "../../hooks/useSurvey";
import { useAuth } from "../../hooks/useAuth";
import { useRecommendations } from "../../hooks/useRecommendations";
import styles from "./Loading.module.scss";

export default function Loading() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { answers } = useSurvey();
  const { user } = useAuth();
  const { fetch, reroll, restaurants, error } = useRecommendations();

  useEffect(() => {
    if (state?.isReroll) {
      reroll(answers, state.excludedKakaoPlaceIds ?? []);
    } else {
      fetch(answers);
    }
  }, []);

  useEffect(() => {
    console.log("answers:", JSON.stringify(answers)); // 추
    if (restaurants) {
      navigate("/pick", {
        state: {
          restaurants,
          adWatched: state?.adWatched ?? false,
        },
      });
    }
  }, [restaurants]);

  useEffect(() => {
    if (error) {
      console.error("API 호출 실패:", error);
      const code = error.response?.data?.code;
      if (code === "RECOMMENDATION_404_1") {
        navigate("/search-error");
      } else if (error.response?.status === 404) {
        alert("목적지를 먼저 설정해주세요.");
        navigate("/address", { state: { next: "/welcome" } });
      } else {
        alert("추천을 불러오지 못했어요. 다시 시도해주세요.");
        navigate(-1);
      }
    }
  }, [error]);

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