import { useState, useEffect } from "react";

import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getweather, filterWeatherdata } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [items, setItems] = useState(defaultClothingItems);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddGarment = ({ name, imageURL, weatherType }) => {
    const newItem = {
      _id: Date.now(),
      name,
      weather: weatherType,
      link: imageURL,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setActiveModal("");
  };

  useEffect(() => {
    getweather(coordinates.latitude, coordinates.longitude, APIkey)
      .then((data) => {
        const filteredData = filterWeatherdata(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header onAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} items={items} />
      </div>
      {activeModal === "add-garment" && (
        <ModalWithForm
          onClose={closeActiveModal}
          onAddGarment={handleAddGarment}
        />
      )}
      <ItemModal
        activeModal={activeModal}
        Card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
