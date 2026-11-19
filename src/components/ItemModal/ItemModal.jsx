import { useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/close.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ selectedCard, activeModal, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  if (activeModal !== "preview") return null;
  const ownerId = selectedCard.owner?._id || selectedCard.owner;
  const isOwn = currentUser && String(ownerId) === String(currentUser._id);

  return (
    <div
      className="modal"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="modal__content modal__content_type_image modal__content_open"
        role="dialog"
        aria-modal="true"
        aria-label={selectedCard.name || "Clothing item"}
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
          aria-label="Close modal"
        >
          <img className="modal__close-icon" src={closeIcon} alt="" />
        </button>
        <img
          alt={selectedCard.name || "Clothing item"}
          src={selectedCard.imageUrl || selectedCard.link || ""}
          className="modal__image"
        />
        <div className="modal__caption">
          <div className="item-modal__header">
            <h2 className="modal__title modal__title_type_caption">
              {selectedCard.name || ""}
            </h2>
            <span className="item-modal__weather">
              Weather: {selectedCard.weather || "—"}
            </span>
            {isOwn && (
              <button
                className="item-modal__delete"
                type="button"
                onClick={() => onDelete(selectedCard)}
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
