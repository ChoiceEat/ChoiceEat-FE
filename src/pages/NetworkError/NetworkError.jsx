import ErrorPage from "../../components/ErrorPage/ErrorPage";
import ErrorImg from "../../assets/error-network.png";

export default function NetworkError() {
  return (
    <ErrorPage
      illustration={ErrorImg}
      illustrationWidth={134}
      illustrationHeight={108}
      title="서비스 이용이 원활하지 않아요"
      desc={
        <>
          불편을 드려 죄송해요.
          <br />
          인터넷 연결 확인 후 다시 시도해 주세요.
        </>
      }
      primaryLabel="재시도"
      onPrimary={() => window.location.reload()}
      infoText={
        <>
          인터넷 연결이 정상인데 이 화면이 보인다면
          <br />
          관리자에게 문의 바랍니다.
        </>
      }
    />
  );
}
