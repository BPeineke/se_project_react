const baseUrl = "http://localhost:3001";

const checkResponse = async (response) => {
  const responseData = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(responseData.message || `Request failed: ${response.status}`);
  }
  return responseData;
};

export const register = (userData) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  }).then(checkResponse);

export const login = (credentials) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then(checkResponse);

export const getUserInfo = (token) =>
  fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

export const updateUser = (userData, token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
