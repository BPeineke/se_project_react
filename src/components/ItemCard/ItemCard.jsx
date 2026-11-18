import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, handleCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = Boolean(
    currentUser &&
      item.likes?.some((like) => {
        const likeId = like?._id || like;
        return String(likeId) === String(currentUser._id);
      }),
  );
  const likeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLike = (event) => {
    event.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      {currentUser && (
        <button
          className={likeButtonClassName}
          type="button"
          aria-label={isLiked ? "Remove like" : "Like item"}
          aria-pressed={isLiked}
          onClick={handleLike}
        >
          ♥
        </button>
      )}
      <button
        className="card__button"
        type="button"
        onClick={() => handleCardClick(item)}
      >
        <span className="card__name">{item.name}</span>
        <img
          className="card__image"
          src={item.imageUrl || item.link}
          alt={item.name}
        />
      </button>
    </li>
  );
}

export default ItemCard;
