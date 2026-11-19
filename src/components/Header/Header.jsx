import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../Main/Toggleswitch/ToggleSwitch.js/ToggleSwitch.jsx";

function Header({
  onAddClick,
  onLoginClick,
  onRegisterClick,
  isLoggedIn,
  weatherData,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/" className="header__logo-link" aria-label="WTWR home">
        <img className="header__logo" src={logo} alt="WTWR" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            className="header__add-clothes-btn"
            onClick={onAddClick}
            type="button"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__user-container">
            <span className="header__username">{currentUser?.name}</span>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={`${currentUser.name || "User"} avatar`}
                className="header__avatar"
              />
            ) : (
              <span
                className="user-avatar-placeholder user-avatar-placeholder_size_header"
                aria-hidden="true"
              >
                {currentUser?.name?.charAt(0).toUpperCase() || "?"}
              </span>
            )}
          </Link>
        </>
      ) : (
        <div className="header__auth-actions">
          <button
            className="header__auth-button"
            type="button"
            onClick={onLoginClick}
          >
            Log in
          </button>
          <button
            className="header__auth-button header__auth-button_prominent"
            type="button"
            onClick={onRegisterClick}
          >
            Sign up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
