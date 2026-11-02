const baseUrl = "http://localhost:3001";

const checkResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(`Request failed: ${response.status}`));
  }
  return response;
};

export const getItems = () =>
  fetch(`${baseUrl}/items`).then(checkResponse).then((response) => response.json());

export const addItem = (item) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(checkResponse).then((response) => response.json());

export const deleteItem = (id) =>
  fetch(`${baseUrl}/items/${encodeURIComponent(id)}`, { method: "DELETE" }).then(checkResponse);
