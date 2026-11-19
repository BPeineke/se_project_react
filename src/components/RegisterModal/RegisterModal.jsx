import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onRegister, onClose, onSwitchToLogin }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      await onRegister(values);
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || "Unable to create your account.");
    }
  };

  const handleSwitchToLogin = () => {
    resetForm();
    setErrorMessage("");
    onSwitchToLogin();
  };

  const handleClose = () => {
    resetForm();
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          className="modal__input"
          id="register-name"
          name="name"
          type="text"
          minLength="2"
          maxLength="30"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          id="register-avatar"
          name="avatar"
          type="url"
          autoComplete="url"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          className="modal__input"
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          className="modal__input"
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      {errorMessage && (
        <p className="modal__error" role="alert">
          {errorMessage}
        </p>
      )}
      <p className="modal__switch">
        Already have an account?{" "}
        <button
          className="modal__switch-button"
          type="button"
          onClick={handleSwitchToLogin}
        >
          Log in
        </button>
      </p>
    </ModalWithForm>
  );
}

export default RegisterModal;
