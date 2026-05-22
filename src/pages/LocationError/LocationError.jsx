import { useNavigate } from "react-router-dom";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import ErrorImg from "../../assets/error-location.png";

export default function LocationError() {
  const navigate = useNavigate();

  return (
    <ErrorPage
      illustration={ErrorImg}
      illustrationWidth={107}
      illustrationHeight={127}
      title="위치 정보를 가져올 수 없어요"
      desc={
        <>
          불편을 드려 죄송해요.
          <br />
          위치 권한을 확인해주세요.
        </>
      }
      primaryLabel="설정으로 이동"
      onPrimary={() => navigate("/settings")}
      infoText={
        <>
          위치 권한이 정상인데 이 화면이 보인다면
          <br />
          관리자에게 문의 바랍니다.
        </>
      }
    />
  );
}
