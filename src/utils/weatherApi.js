export const getweather = (latitude, longitude, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  });
};

export const filterWeatherdata = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(result.temp.F);
  result.condition = mapWeatherCondition(data.weather[0]?.main || "Clear");
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const mapWeatherCondition = (condition) => {
  const normalized = condition.toLowerCase();

  const conditionMap = {
    clear: "clear",
    clouds: "cloudy",
    few: "cloudy",
    scattered: "cloudy",
    broken: "cloudy",
    overcast: "cloudy",
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

const isDay = (sys, now) => {
  const sunriseTime = new Date((sys?.sunrise || 0) * 1000);
  const sunsetTime = new Date((sys?.sunset || 0) * 1000);
  return now > sunriseTime.getTime() && now < sunsetTime.getTime();
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  }

  if (temperature >= 66 && temperature < 86) {
    return "warm";
  }

  return "cold";
};
