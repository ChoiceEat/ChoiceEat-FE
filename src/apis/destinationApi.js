import api from "./api";

// 카카오 키워드로 목적지 검색
export async function searchDestinations(query) {
  const { data } = await api.get("/api/destinations/search", {
    params: { query },
  });
  return data.data.destinations; // [{kakaoPlaceId, placeName, address, ...}]
}

// 선택한 목적지 저장
export async function saveSelectedDestination(destination) {
  const { data } = await api.patch("/api/destinations/selected", destination);
  return data.data;
}

// 현재 저장된 목적지 조회
export async function getSelectedDestination() {
  const { data } = await api.get("/api/destinations/selected");
  return data.data;
}
