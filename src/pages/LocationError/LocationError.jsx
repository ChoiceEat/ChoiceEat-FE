import { useNavigate } from "react-router-dom";
import styles from "./LocationError.module.scss";
import ErrorImg from "../../assets/error-location.png";

export default function LocationError() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <nav className={styles.topNav}>
        <button className={styles.iconBtn} onClick={() => navigate(-1)}>
          <img src="/icons/backG.svg" alt="뒤로" width={24} height={24} />
        </button>
        <div className={styles.navRight}>
          <button className={styles.iconBtn}>
            <img src="/icons/settings.svg" alt="설정" width={22} height={22} />
          </button>
          <button className={styles.iconBtn}>
            <img src="/icons/menu.svg" alt="메뉴" width={16} height={16} />
          </button>
        </div>
      </nav>

      <img src={ErrorImg} alt="위치 오류" className={styles.illustration} />

      <h1 className={styles.title}>위치 정보를 가져올 수 없어요</h1>

      <p className={styles.desc}>
        불편을 드려 죄송해요.
        <br />
        위치 권한을 확인해주세요.
      </p>

      <div className={styles.btnGroup}>
        <button className={styles.btnBack} onClick={() => navigate(-1)}>
          뒤로 가기
        </button>
        <button className={styles.btnSettings}>설정으로 이동</button>
      </div>

      <button className={styles.infoLink}>
        <img src="/icons/info.svg" alt="" width={14} height={14} />
        <span className={styles.infoText}>
          위치 권한이 정상인데 이 화면이 보인다면?
        </span>
      </button>
    </div>
  );
}
