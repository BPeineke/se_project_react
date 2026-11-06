const checkResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(`Request failed: ${response.status}`));
  }
  return response;
};
export const getWeather = (latitude, longitude, apiKey) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  )
    .then(checkResponse)
    .then((response) => response.json());

export const filterWeatherData = (data) => {
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

export const mapWeatherCondition = (condition) => {
  const normalized = condition.toLowerCase();
  const conditionMap = {
    clear: "clear",
    clouds: "cloudy",
    mist: "fog",
    haze: "fog",
    smoke: "fog",
    dust: "fog",
    fog: "fog",
    rain: "rain",
    drizzle: "rain",
    thunderstorm: "storm",
    snow: "snow",
  };
  return conditionMap[normalized] || "clear";
};

export const isDay = (sys, now) => {
  const sunrise = (sys?.sunrise || 0) * 1000;
  const sunset = (sys?.sunset || 0) * 1000;
  return now > sunrise && now < sunset;
};

export const getWeatherType = (fahrenheit) => {
  if (fahrenheit >= 86) return "hot";
  if (fahrenheit >= 66) return "warm";
  return "cold";
};
