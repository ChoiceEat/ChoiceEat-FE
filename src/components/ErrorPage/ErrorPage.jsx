import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

export default function ErrorPage({
  illustration,
  illustrationWidth = 107,
  illustrationHeight = 127,
  title,
  desc,
  primaryLabel,
  onPrimary,
  infoText,
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <nav className={styles.topNav}>
        <button className={styles.iconBtn} onClick={() => navigate(-1)}>
          <img src="/icons/backG.svg" alt="뒤로" width={24} height={24} />
        </button>
        <div className={styles.navRight}>
          <button
            className={styles.iconBtn}
            onClick={() => navigate("/settings")}
          >
            <img src="/icons/settings.svg" alt="설정" width={22} height={22} />
          </button>
        </div>
      </nav>

      <img
        src={illustration}
        alt=""
        className={styles.illustration}
        style={{ width: illustrationWidth, height: illustrationHeight }}
      />

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.desc}>{desc}</p>

      <div className={styles.btnGroup}>
        <button className={styles.btnBack} onClick={() => navigate(-1)}>
          뒤로 가기
        </button>
        <button className={styles.btnPrimary} onClick={onPrimary}>
          {primaryLabel}
        </button>
      </div>

      {infoText && (
        <p className={styles.infoLink}>
          <img src="/icons/info.svg" alt="" width={14} height={14} />
          <span className={styles.infoText}>{infoText}</span>
        </p>
      )}
    </div>
  );
}
