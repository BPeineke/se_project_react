import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onAddItem, onClose }) {
  const { values, handleChange, resetForm } = useForm({ name: "", imageUrl: "", weather: "hot" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const succeeded = await onAddItem(values);
    if (succeeded) {
      resetForm();
      onClose();
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      name="new-garment"
      buttonText="Add garment"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input className="modal__input" id="name" name="name" type="text" placeholder="Name" value={values.name} onChange={handleChange} required />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image URL
        <input className="modal__input" id="imageUrl" name="imageUrl" type="url" placeholder="Image URL" value={values.imageUrl} onChange={handleChange} required />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((weather) => (
          <label key={weather} htmlFor={weather} className="modal__label modal__label_type_radio">
            <input id={weather} name="weather" type="radio" className="modal__radio-input" value={weather} checked={values.weather === weather} onChange={handleChange} />
            {weather[0].toUpperCase() + weather.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
