const baseUrl = "http://localhost:3001";

export const checkResponse = async (response) => {
  const responseData = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      responseData.message || `Request failed: ${response.status}`
    );
  }
  return responseData;
};

export const getItems = () => fetch(`${baseUrl}/items`).then(checkResponse);

export const addItem = (item, token) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(checkResponse);

export const deleteItem = (id, token) =>
  fetch(`${baseUrl}/items/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then(checkResponse);

export const addCardLike = (id, token) =>
  fetch(`${baseUrl}/items/${encodeURIComponent(id)}/likes`, {
    method: "PUT",
    headers: { authorization: `Bearer ${token}` },
  }).then(checkResponse);

export const removeCardLike = (id, token) =>
  fetch(`${baseUrl}/items/${encodeURIComponent(id)}/likes`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then(checkResponse);

