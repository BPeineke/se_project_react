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

export const getweather = (latitude, longitude, APIkey) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then(checkResponse).then((response) => response.json());

export const filterWeatherdata = (data) => {
  const fahrenheit = data.main.temp;
  const temperature = {
    F: fahrenheit,
    C: Math.round(((fahrenheit - 32) * 5) / 9),
  };
  return {
    city: data.name,
    temperature,
    type: getWeatherType(fahrenheit),
    condition: mapWeatherCondition(data.weather?.[0]?.main || "Clear"),
    isDay: isDay(data.sys, Date.now()),
  };
};

const mapWeatherCondition = (condition) => {
  const normalized = condition.toLowerCase();
  const conditionMap = {
    clear: "clear", clouds: "cloudy", mist: "fog", haze: "fog", smoke: "fog",
    dust: "fog", fog: "fog", rain: "rain", drizzle: "rain",
    thunderstorm: "storm", snow: "snow",
  };
  return conditionMap[normalized] || "clear";
};

const isDay = (sys, now) => {
  const sunrise = (sys?.sunrise || 0) * 1000;
  const sunset = (sys?.sunset || 0) * 1000;
  return now > sunrise && now < sunset;
};

const getWeatherType = (fahrenheit) => {
  if (fahrenheit >= 86) return "hot";
  if (fahrenheit >= 66) return "warm";
  return "cold";
};
