import "./ItemModal.css";

function ItemModal({ activeModal, onClose }) {
  if (activeModal !== "preview") return null;

  return (
    <div className="modal">
      <div className="modal__content modal__content_type_image modal__content_open">
        <button onClick={onClose} type="button" className="modal__close">
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
