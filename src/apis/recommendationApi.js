import api from "./api";

export async function fetchRecommendations(answers) {
  const { data } = await api.post("/api/recommendations", {
    menuType: answers.menu,
    mood: answers.vibe,
    budget: answers.budget,
  });
  return data.data;
}