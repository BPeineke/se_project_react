import "./ItemModal.css";

function ItemModal({ activeModal, OnClose, Card }) {
  return (
    <div className="modal">
      <div
        className={`modal__content modal__content_type_image ${activeModal === "preview" ? "modal__content_open" : ""}`}
      >
        <button onClick={OnClose} type="button" className="modal__close">
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
