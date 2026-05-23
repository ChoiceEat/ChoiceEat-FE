import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.scss";
import BackIcon from "../../assets/icons/backB.svg";
import EyeOffIcon from "../../assets/icons/eye-off.svg";
import EyeIcon from "../../assets/icons/eye.svg";

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPassword = (v) => /^(?=.*[a-zA-Z])(?=.*\d).{8,12}$/.test(v);

export default function Signup() {
  const navigate = useNavigate();

  // 아이디
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [emailStatus, setEmailStatus] = useState(""); // '' | 'ok' | 'error'

  // 비밀번호
  const [password, setPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 비밀번호 확인
  const [confirmPw, setConfirmPw] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // 닉네임
  const [nickname, setNickname] = useState("");

  const canCheckDuplicate = isValidEmail(email);
  const canSubmit =
    emailStatus === "ok" &&
    passwordStatus === "ok" &&
    confirmStatus === "ok" &&
    nickname.trim() !== "";

  // 중복 확인
  const handleDuplicateCheck = () => {
    if (!canCheckDuplicate) return;
    const users = JSON.parse(localStorage.getItem("choiceeat_users") || "[]");
    if (users.some((u) => u.email === email)) {
      setEmailMsg("사용중인 아이디입니다.");
      setEmailStatus("error");
    } else {
      setEmailMsg("사용 가능한 아이디 입니다.");
      setEmailStatus("ok");
    }
  };

  // 비밀번호 변경
  const handlePasswordChange = (val) => {
    setPassword(val);
    if (!val) {
      setPasswordMsg("");
      setPasswordStatus("");
    } else if (!isValidPassword(val)) {
      setPasswordMsg("영문과 숫자를 모두 포함하여 8~12자리로 입력해 주세요.");
      setPasswordStatus("error");
    } else {
      setPasswordMsg("사용 가능한 비밀번호 입니다.");
      setPasswordStatus("ok");
    }
    // 비밀번호 확인 재검증
    if (confirmPw) {
      if (val !== confirmPw) {
        setConfirmMsg("비밀번호가 일치하지 않습니다.");
        setConfirmStatus("error");
      } else {
        setConfirmMsg("비밀번호가 일치합니다.");
        setConfirmStatus("ok");
      }
    }
  };

  // 비밀번호 확인 변경
  const handleConfirmChange = (val) => {
    setConfirmPw(val);
    if (!val) {
      setConfirmMsg("");
      setConfirmStatus("");
    } else if (val !== password) {
      setConfirmMsg("비밀번호가 일치하지 않습니다.");
      setConfirmStatus("error");
    } else {
      setConfirmMsg("비밀번호가 일치합니다.");
      setConfirmStatus("ok");
    }
  };

  // 가입하기
  const handleSignup = () => {
    if (!canSubmit) return;
    const users = JSON.parse(localStorage.getItem("choiceeat_users") || "[]");
    users.push({ email, password, nickname });
    localStorage.setItem("choiceeat_users", JSON.stringify(users));
    navigate("/login");
  };

  const fieldBorderClass = (status) =>
    status === "ok"
      ? styles.fieldOk
      : status === "error"
        ? styles.fieldError
        : "";

  const msgClass = (status) =>
    status === "ok" ? styles.msgOk : styles.msgError;

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="뒤로가기" />
        </button>
        <span className={styles.headerTitle}>회원가입</span>
      </header>

      <div className={styles.form}>
        {/* 아이디 (이메일) */}
        <div className={styles.fieldGroup}>
          <div className={styles.emailRow}>
            <div
              className={`${styles.underlineField} ${fieldBorderClass(emailStatus)}`}
            >
              <input
                className={`${styles.underlineInput} ${email ? styles.inputFilled : ""}`}
                type="text"
                placeholder="아이디 (이메일)"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailMsg("");
                  setEmailStatus("");
                }}
              />
            </div>
            <button
              className={`${styles.checkBtn} ${canCheckDuplicate ? styles.checkBtnActive : ""}`}
              onClick={handleDuplicateCheck}
              disabled={!canCheckDuplicate}
            >
              중복 확인
            </button>
          </div>
          {emailMsg && (
            <p className={`${styles.helperMsg} ${msgClass(emailStatus)}`}>
              {emailMsg}
            </p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className={styles.fieldGroup}>
          <div
            className={`${styles.underlineField} ${fieldBorderClass(passwordStatus)}`}
          >
            <input
              className={`${styles.underlineInput} ${password ? styles.inputFilled : ""}`}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <button
              className={styles.eyeBtn}
              onClick={() => setShowPassword((v) => !v)}
              type="button"
            >
              <img
                src={showPassword ? EyeIcon : EyeOffIcon}
                alt="비밀번호 보기 전환"
              />
            </button>
          </div>
          <p
            className={`${styles.helperMsg} ${passwordStatus ? msgClass(passwordStatus) : styles.msgGuide}`}
          >
            {passwordMsg || "영문, 숫자를 이용하여 8~12 자리로 입력해주세요."}
          </p>
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.fieldGroup}>
          <div
            className={`${styles.underlineField} ${fieldBorderClass(confirmStatus)}`}
          >
            <input
              className={`${styles.underlineInput} ${confirmPw ? styles.inputFilled : ""}`}
              type={showConfirm ? "text" : "password"}
              placeholder="비밀번호 확인"
              value={confirmPw}
              onChange={(e) => handleConfirmChange(e.target.value)}
            />
            <button
              className={styles.eyeBtn}
              onClick={() => setShowConfirm((v) => !v)}
              type="button"
            >
              <img
                src={showConfirm ? EyeIcon : EyeOffIcon}
                alt="비밀번호 확인 보기 전환"
              />
            </button>
          </div>
          {confirmMsg && (
            <p className={`${styles.helperMsg} ${msgClass(confirmStatus)}`}>
              {confirmMsg}
            </p>
          )}
        </div>

        {/* 닉네임 */}
        <div className={styles.fieldGroup}>
          <div
            className={`${styles.underlineField} ${nickname ? styles.fieldOk : ""}`}
          >
            <input
              className={`${styles.underlineInput} ${nickname ? styles.inputFilled : ""}`}
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>

        {/* 가입하기 버튼 */}
        <button
          className={`${styles.submitBtn} ${canSubmit ? styles.submitBtnActive : ""}`}
          onClick={handleSignup}
          disabled={!canSubmit}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
