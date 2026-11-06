import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ items, onCardClick, onAddClick }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__heading">
        <h2>Your items</h2>
        <button type="button" onClick={onAddClick}>
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} handleCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
