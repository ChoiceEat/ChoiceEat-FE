//공통 axois 설정 파일(모든 api파일마다 axios.create..., baseURL, 토큰처리 안해도됨)
//api.js-> 공통 axois객체 생성 -> 다른 api파일들이 가져다 사용
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  // 백엔드 서버 주소
  baseURL: BASE_URL,
});

const PUBLIC_URLS = [
  "/api/users/login",
  "/api/users/signup",
  "/api/users/check-email",
];

api.interceptors.request.use((config) => {
  const isPublic = PUBLIC_URLS.some((url) => config.url?.startsWith(url));
  if (!isPublic) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
