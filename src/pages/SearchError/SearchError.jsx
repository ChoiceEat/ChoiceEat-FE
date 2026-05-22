import { useNavigate } from "react-router-dom";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import ErrorImg from "../../assets/error-search.png";

export default function SearchError() {
  const navigate = useNavigate();

  return (
    <ErrorPage
      illustration={ErrorImg}
      illustrationWidth={120}
      illustrationHeight={123}
      title="조건에 맞는 음식점이 없어요"
      desc={
        <>
          불편을 드려 죄송해요.
          <br />
          조건을 새로 맞춰주세요.
        </>
      }
      primaryLabel="재검색"
      onPrimary={() => navigate("/step1")}
    />
  );
}
