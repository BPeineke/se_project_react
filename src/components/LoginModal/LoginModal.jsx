import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onLogin, onClose, onSwitchToRegister }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      await onLogin(values);
      resetForm();
    } catch (error) {
      setErrorMessage(error.message || "Unable to sign in.");
    }
  };

  const handleSwitchToRegister = () => {
    resetForm();
    setErrorMessage("");
    onSwitchToRegister();
  };

  const handleClose = () => {
    resetForm();
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          className="modal__input"
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          className="modal__input"
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
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
        No account yet?{" "}
        <button
          className="modal__switch-button"
          type="button"
          onClick={handleSwitchToRegister}
        >
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}

export default LoginModal;
