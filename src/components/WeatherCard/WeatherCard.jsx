import { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isDay = weatherData?.isDay ?? true;
  const condition = weatherData?.condition ?? "clear";
  const weatherOption = weatherOptions.find(
    (option) => option.day === isDay && option.condition === condition,
  ) || defaultWeatherOptions[isDay ? "day" : "night"];
  const temperature = weatherData?.temperature?.[currentTemperatureUnit] ?? 0;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temperature} &deg; {currentTemperatureUnit}</p>
      <img
        src={weatherOption.url}
        alt={`${isDay ? "Daytime" : "Nighttime"} ${condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
