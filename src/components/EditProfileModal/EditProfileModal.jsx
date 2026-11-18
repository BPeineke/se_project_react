import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onUpdateProfile, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({ name: "", avatar: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
      setErrorMessage("");
    }
  }, [isOpen, currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      await onUpdateProfile(values);
    } catch (error) {
      setErrorMessage(error.message || "Unable to update your profile.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Edit profile"
      name="edit-profile"
      buttonText="Save changes"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label htmlFor="profile-name" className="modal__label">
        Name
        <input
          className="modal__input"
          id="profile-name"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="profile-avatar" className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          id="profile-avatar"
          name="avatar"
          type="url"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      {errorMessage && (
        <p className="modal__error" role="alert">
          {errorMessage}
        </p>
      )}
    </ModalWithForm>
  );
}

export default EditProfileModal;
