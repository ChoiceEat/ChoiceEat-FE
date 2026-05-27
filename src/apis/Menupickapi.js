import api from "./api";

export async function fetchMenuRecommendations(kakaoPlaceId) {
  const { data } = await api.get("/api/menu-picks/recommendations", {
    params: { kakaoPlaceId },
  });
  return data.data;
}
