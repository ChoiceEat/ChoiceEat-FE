import axios from "axios";

export const postAdView = async ({ advertisementId = 3, completed = true } = {}) => {
  const response = await axios.post("/api/ad/view", { advertisementId, completed });
  return response.data;
};
