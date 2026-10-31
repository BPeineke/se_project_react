import "./ItemModal.css";
import closeIcon from "../../assets/close.png";

function ItemModal({ selectedCard, activeModal, onClose, onDelete }) {
  if (activeModal !== "preview") return null;
  return (
    <div className="modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal__content modal__content_type_image modal__content_open" role="dialog" aria-modal="true" aria-label={selectedCard.name || "Clothing item"}>
        <button onClick={onClose} type="button" className="modal__close" aria-label="Close modal">
          <img src={closeIcon} alt="" />
        </button>
        <img alt={selectedCard.name || "Clothing item"} src={selectedCard.imageUrl || selectedCard.link || ""} className="modal__image" />
        <div className="modal__caption">
          <div className="item-modal__header">
            <h2 className="modal__title">{selectedCard.name || ""}</h2>
            <span className="item-modal__weather">Weather: {selectedCard.weather || "—"}</span>
            <button className="item-modal__delete" type="button" onClick={() => onDelete(selectedCard)}>Delete item</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
