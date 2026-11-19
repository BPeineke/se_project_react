import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ items, onCardClick, onCardLike, onAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = items.filter((item) => {
    const ownerId = item.owner?._id || item.owner;
    return String(ownerId) === String(currentUser?._id);
  });

  return (
    <section className="clothes-section">
      <div className="clothes-section__heading">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          className="clothes-section__add-button"
          type="button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            handleCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
