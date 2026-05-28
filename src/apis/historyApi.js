import api from "./api";

export async function saveHistory(kakaoPlaceId, recommendationType) {
  const { data } = await api.post("/api/histories", {
    kakaoPlaceId,
    recommendationType,
  });
  return data;
}

export async function getHomeHistories() {
  const { data } = await api.get("/api/histories/home");
  return data;
}

export async function getAllHistories() {
  const { data } = await api.get("/api/histories");
  return data;
}

export const fetchHistories = getAllHistories;
export const fetchHomeHistories = getHomeHistories;
