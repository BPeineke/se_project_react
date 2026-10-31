import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  return (
    <li className="card">
      <button className="card__button" type="button" onClick={() => handleCardClick(item)}>
        <span className="card__name">{item.name}</span>
        <img className="card__image" src={item.imageUrl || item.link} alt={item.name} />
      </button>
    </li>
  );
}

export default ItemCard;
