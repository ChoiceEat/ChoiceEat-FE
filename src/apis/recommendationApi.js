import api from "./api";

export async function fetchRecommendations(answers) {
  const { data } = await api.post("/api/recommendations", {
    menuType: answers.menu,
    mood: answers.vibe,
    budget: answers.budget,
  });
  return data.data;
}

export async function fetchRerollRecommendations(
  answers,
  excludedKakaoPlaceIds = [],
) {
  const { data } = await api.post("/api/recommendations/reroll", {
    menuType: answers.menu,
    mood: answers.vibe,
    budget: answers.budget,
    excludedKakaoPlaceIds,
  });
  return data.data;
}
