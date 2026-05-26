const BASE_URL = import.meta.env.VITE_API_URL;

export async function checkEmail(email) {
  const response = await fetch(
    `${BASE_URL}/api/users/check-email?email=${encodeURIComponent(email)}`
  );
  const data = await response.json();
  return data;
}

export async function loginApi({ email, password }) {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return { status: response.status, data };
}

export async function signup({ email, password, nickname }) {
  const response = await fetch(`${BASE_URL}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, nickname }),
  });
  const data = await response.json();
  return { status: response.status, data };
}
