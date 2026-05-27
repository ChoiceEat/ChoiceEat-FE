import api from "./api";

export async function fetchHistories() {
  const { data } = await api.get("/api/histories");
  return data.data;
}

export async function fetchHomeHistories() {
  const { data } = await api.get("/api/histories/home");
  return data.data;
}
