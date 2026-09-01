import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const isDay = weatherData?.isDay ?? true;
  const condition = weatherData?.condition ?? "clear";

  const filteredOptions = weatherOptions.filter(
    (option) => option.day === isDay && option.condition === condition,
  );

  const weatherOption =
    filteredOptions.length > 0
      ? filteredOptions[0]
      : defaultWeatherOptions[isDay ? "day" : "night"];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData?.temp?.F ?? 0} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={
          isDay
            ? `Daytime ${condition} weather`
            : `Nighttime ${condition} weather`
        }
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
