import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("choiceeat_current_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    localStorage.setItem("choiceeat_current_user", JSON.stringify(userData));
    // api.js 인터셉터가 읽는 키에도 토큰 저장
    if (userData.accessToken) {
      localStorage.setItem("accessToken", userData.accessToken);
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("choiceeat_current_user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("savedAddress");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
