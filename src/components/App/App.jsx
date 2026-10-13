import { useState, useEffect } from "react";

import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
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
  const [items, setItems] = useState(defaultClothingItems);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddGarment = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const imageURL = formData.get("imageURL")?.toString().trim() ?? "";
    const weatherType = formData.get("weatherType")?.toString() ?? "";

    if (!name || !imageURL) {
      return;
    }

    const newItem = {
      _id: Date.now(),
      name,
      weather: weatherType,
      link: imageURL,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    closeActiveModal();
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
        <Main
          weatherData={weatherData}
          items={items}
          handleCardClick={handleCardClick}
        />
      </div>
      <Footer />
      <ModalWithForm
        title="New garment"
        name="new-garment"
        buttonText="Add garment"
        onSubmit={handleAddGarment}
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image
          <input
            type="text"
            className="modal__input"
            id="imageURL"
            name="imageURL"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              name="weatherType"
              type="radio"
              className="modal__radio-input"
              value="hot"
              defaultChecked
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__label modal__label_type_radio">
            <input
              id="warm"
              name="weatherType"
              type="radio"
              className="modal__radio-input"
              value="warm"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__label modal__label_type_radio">
            <input
              id="cold"
              name="weatherType"
              type="radio"
              className="modal__radio-input"
              value="cold"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        selectedCard={selectedCard || {}}
        activeModal={activeModal}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
