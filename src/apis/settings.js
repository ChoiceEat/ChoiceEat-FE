import api from "./api";

export async function getSettings(userId) {
  try {
    const response = await api.get(`/api/settings`, { params: { userId } });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    }
    throw error;
  }
}

export async function updateSettings(userId, body) {
  try {
    const response = await api.patch(`/api/settings`, body, {
      params: { userId },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    }
    throw error;
  }
}
