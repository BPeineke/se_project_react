import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../Main/Toggleswitch/ToggleSwitch.js/ToggleSwitch.jsx";

function Header({ onAddClick, weatherData }) {
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
      <button className="header__add-clothes-btn" onClick={onAddClick} type="button">
        + Add clothes
      </button>
      <Link to="/profile" className="header__user-container">
        <span className="header__username">Terrence Tegegne</span>
        <img src={avatar} alt="" className="header__avatar" />
      </Link>
    </header>
  );
}

export default Header;

