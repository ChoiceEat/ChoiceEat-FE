import api from "./api";

export const getRandomAd = async () => {
  const response = await api.get("/api/ad/random");
  return response.data;
};

export const postAdView = async ({ advertisementId, completed = true } = {}) => {
  const response = await api.post("/api/ad/view", { advertisementId, completed });
  return response.data;
};
