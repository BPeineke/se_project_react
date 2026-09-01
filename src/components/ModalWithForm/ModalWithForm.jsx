import { useState } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ onClose, onAddGarment }) {
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [weatherType, setWeatherType] = useState("hot");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !imageURL.trim()) {
      return;
    }

    onAddGarment({ name: name.trim(), imageURL: imageURL.trim(), weatherType });
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">New garment</h2>
        <button onClick={onClose} type="button" className="modal__close">
          CLOSE
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageURL" className="modal__label">
            Image
            <input
              type="text"
              className="modal__input"
              id="imageURL"
              value={imageURL}
              onChange={(event) => setImageURL(event.target.value)}
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                name="weatherType"
                type="radio"
                className="modal__radio-input"
                value="hot"
                checked={weatherType === "hot"}
                onChange={(event) => setWeatherType(event.target.value)}
              />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                name="weatherType"
                type="radio"
                className="modal__radio-input"
                value="warm"
                checked={weatherType === "warm"}
                onChange={(event) => setWeatherType(event.target.value)}
              />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                name="weatherType"
                type="radio"
                className="modal__radio-input"
                value="cold"
                checked={weatherType === "cold"}
                onChange={(event) => setWeatherType(event.target.value)}
              />
              Cold
            </label>
          </fieldset>
          <button type="submit" className="modal__submit">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
