import closeIcon from "../../assets/close.png";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name: formName,
  buttonText,
  onSubmit,
  isOpen,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" />
        </button>
        <form className="modal__form" name={formName} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
