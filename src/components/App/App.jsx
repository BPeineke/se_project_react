import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { apiKey, coordinates } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  addCardLike,
  addItem,
  deleteItem,
  getItems,
  removeCardLike,
} from "../../utils/api";
import {
  getUserInfo,
  login as loginUser,
  register as registerUser,
  updateUser,
} from "../../utils/auth";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: { F: 0, C: 0 },
    city: "",
    condition: "clear",
    isDay: true,
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const closeActiveModal = () => setActiveModal("");
  const openModal = (modalName) => setActiveModal(modalName);

  const saveSession = async (token) => {
    if (!token) {
      throw new Error("The server did not return an authorization token.");
    }

    localStorage.setItem("jwt", token);
    try {
      const user = await getUserInfo(token);
      setCurrentUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      localStorage.removeItem("jwt");
      throw error;
    }
  };

  const handleLogin = async (credentials) => {
    const { token } = await loginUser(credentials);
    await saveSession(token);
    closeActiveModal();
    navigate("/");
    return true;
  };

  const handleRegistration = async (formValues) => {
    await registerUser(formValues);
    return handleLogin({
      email: formValues.email,
      password: formValues.password,
    });
  };

  const handleUpdateProfile = async (formValues) => {
    const token = localStorage.getItem("jwt");
    const updatedUser = await updateUser(formValues, token);
    setCurrentUser(updatedUser);
    closeActiveModal();
    return true;
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    closeActiveModal();
    navigate("/");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };
  const handleAddItem = async (formValues) => {
    const token = localStorage.getItem("jwt");
    if (!token) return false;

    const payload = {
      name: formValues.name.trim(),
      imageUrl: formValues.imageUrl.trim(),
      weather: formValues.weather,
    };
    try {
      const item = await addItem(payload, token);
      setItems((currentItems) => [item, ...currentItems]);
      return true;
    } catch (error) {
      console.error("Unable to add clothing item:", error);
      return false;
    }
  };
  const handleCardDelete = async (card) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      await deleteItem(card._id, token);
      setItems((currentItems) =>
        currentItems.filter((item) => item._id !== card._id)
      );
      closeActiveModal();
    } catch (error) {
      console.error("Unable to delete clothing item:", error);
    }
  };

  const handleCardLike = async ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const updatedCard = isLiked
        ? await removeCardLike(id, token)
        : await addCardLike(id, token);
      setItems((currentItems) =>
        currentItems.map((item) => (item._id === id ? updatedCard : item))
      );
    } catch (error) {
      console.error("Unable to update clothing item like:", error);
    }
  };

  useEffect(() => {
    getWeather(coordinates.latitude, coordinates.longitude, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((error) => console.error("Unable to load weather:", error));
    getItems()
      .then(setItems)
      .catch((error) => console.error("Unable to load clothing items:", error));

    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuthChecking(false);
      return;
    }

    getUserInfo(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
        console.error("Unable to restore the user session:", error);
      })
      .finally(() => setIsAuthChecking(false));
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onAddClick={() => openModal("add-item")}
              onLoginClick={() => openModal("login")}
              onRegisterClick={() => openModal("register")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    items={items}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isChecking={isAuthChecking}
                  >
                    <Profile
                      items={items}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onAddClick={() => openModal("add-item")}
                      onEditProfileClick={() => openModal("edit-profile")}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-item"}
            onAddItem={handleAddItem}
            onClose={closeActiveModal}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegistration}
            onClose={closeActiveModal}
            onSwitchToLogin={() => openModal("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onClose={closeActiveModal}
            onSwitchToRegister={() => openModal("register")}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onUpdateProfile={handleUpdateProfile}
            onClose={closeActiveModal}
          />
          <ItemModal
            selectedCard={selectedCard || {}}
            activeModal={activeModal}
            onClose={closeActiveModal}
            onDelete={handleCardDelete}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
