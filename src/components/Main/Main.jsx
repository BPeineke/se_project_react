import { useContext } from "react";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, items, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temperature[currentTemperatureUnit]} &deg; {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {items.filter((item) => item.weather.toLowerCase() === weatherData.type).map((item) => (
            <ItemCard key={item._id} item={item} handleCardClick={handleCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
