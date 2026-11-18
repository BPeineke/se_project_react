import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfileClick, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={`${currentUser.name || "User"} avatar`}
          />
        ) : (
          <span className="sidebar__avatar-placeholder" aria-hidden="true">
            {currentUser?.name?.charAt(0).toUpperCase() || "?"}
          </span>
        )}
        <h2 className="sidebar__title">{currentUser?.name}</h2>
      </div>
      <button
        className="sidebar__action"
        type="button"
        onClick={onEditProfileClick}
      >
        Edit profile
      </button>
      <button
        className="sidebar__action"
        type="button"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </aside>
  );
}

export default SideBar;
