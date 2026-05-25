import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { useAuth } from "../../hooks/useAuth";
import PersonIcon from "../../assets/icons/person.svg";
import LockIcon from "../../assets/icons/lock.svg";
import EyeOffIcon from "../../assets/icons/eye-off.svg";
import EyeIcon from "../../assets/icons/eye.svg";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isActive = id.trim() !== "" && password.trim() !== "";

  const handleLogin = () => {
    setIdError("");
    setPasswordError("");

    const users = JSON.parse(localStorage.getItem("choiceeat_users") || "[]");
    const user = users.find((u) => u.email === id);

    if (!user) {
      setIdError("존재하지 않는 아이디입니다.");
      return;
    }
    if (user.password !== password) {
      setPasswordError("비밀번호를 잘못 입력하셨습니다.");
      return;
    }

    login({ email: user.email, nickname: user.nickname });
    navigate("/home");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.logo}>Choice Eat</h1>

      <img src="/char-login.svg" alt="" className={styles.character} />

      <div className={styles.form}>
        {/* 아이디 */}
        <div className={styles.fieldGroup}>
          <label htmlFor="login-email" className={styles.label}>
            아이디
          </label>
          <div
            className={`${styles.inputWrap} ${idError ? styles.inputError : ""}`}
          >
            <img src={PersonIcon} alt="" className={styles.inputIcon} />
            <input
              id="login-email"
              className={styles.input}
              type="text"
              placeholder="아이디를 입력해주세요"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setIdError("");
              }}
            />
          </div>
          {idError && <p className={styles.errorMsg}>{idError}</p>}
        </div>

        {/* 비밀번호 */}
        <div className={styles.fieldGroup}>
          <label htmlFor="login-password" className={styles.label}>
            비밀번호
          </label>
          <div
            className={`${styles.inputWrap} ${passwordError ? styles.inputError : ""}`}
          >
            <img
              src={LockIcon}
              alt=""
              className={`${styles.inputIcon} ${styles.lockIcon}`}
            />
            <input
              id="login-password"
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <button
              className={styles.eyeBtn}
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="비밀번호 보기 전환"
            >
              <img src={showPassword ? EyeIcon : EyeOffIcon} alt="" />
            </button>
          </div>
          {passwordError && <p className={styles.errorMsg}>{passwordError}</p>}
        </div>

        {/* 로그인 버튼 */}
        <button
          className={`${styles.loginBtn} ${isActive ? styles.loginBtnActive : ""}`}
          onClick={handleLogin}
          disabled={!isActive}
        >
          로그인
        </button>

        {/* 회원가입 링크 */}
        <button
          className={styles.signupLink}
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
