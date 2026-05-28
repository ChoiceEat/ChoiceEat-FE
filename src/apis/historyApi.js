import api from "./api";

export async function saveHistory(kakaoPlaceId, recommendationType) {
  console.log("saveHistory 호출:", { kakaoPlaceId, recommendationType }); // 추가

  const { data } = await api.post("/api/histories", {
    kakaoPlaceId,
    recommendationType,
  });
  return data;
}

export async function getHomeHistories() {
  const { data } = await api.get("/api/histories/home");
  return data; // [{historyId, restaurantName, imageUrl, pickType}]
}

export async function getAllHistories() {
  const { data } = await api.get("/api/histories");
  return data; // [{historyId, restaurantName, imageUrl, category, pickType, selectedAt}]
}