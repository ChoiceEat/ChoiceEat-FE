import api from "./api";

export async function checkEmail(email) {
  const response = await api.get("/api/users/check-email", {
    params: { email },
  });
  return response.data;
}

export async function loginApi({ email, password }) {
  try {
    const response = await api.post("/api/users/login", { email, password });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    }
    throw error;
  }
}

export async function signup({ email, password, nickname }) {
  try {
    const response = await api.post("/api/users/signup", {
      email,
      password,
      nickname,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    }
    throw error;
  }
}
