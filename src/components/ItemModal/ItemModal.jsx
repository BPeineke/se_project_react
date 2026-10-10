import "./ItemModal.css";
import closeIcon from "../../assets/close.png";

function ItemModal({ selectedCard, activeModal, onClose }) {
  if (activeModal !== "preview") return null;
  console.log(selectedCard);
  return (
    <div className="modal">
      <div className="modal__content modal__content_type_image modal__content_open">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>

        <img
          alt={selectedCard.name || ""}
          src={selectedCard.link || ""}
          className="modal__image"
        />
        <div className="modal__caption">
          <h2 className="modal__title">{selectedCard.name || ""}</h2>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
