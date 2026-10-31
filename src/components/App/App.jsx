import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { APIkey, coordinates } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { addItem, deleteItem, filterWeatherdata, getItems, getweather } from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: { F: 0, C: 0 },
    city: "",
    condition: "clear",
    isDay: true,
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [items, setItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const closeActiveModal = () => setActiveModal("");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };
  const handleAddItem = async (formValues) => {
    const payload = {
      name: formValues.name.trim(),
      imageUrl: formValues.imageUrl.trim(),
      weather: formValues.weather,
    };
    try {
      const item = await addItem(payload);
      setItems((currentItems) => [item, ...currentItems]);
      return true;
    } catch (error) {
      console.error("Unable to add clothing item:", error);
      return false;
    }
  };
  const handleCardDelete = async (card) => {
    try {
      await deleteItem(card._id);
      setItems((currentItems) => currentItems.filter((item) => item._id !== card._id));
      closeActiveModal();
    } catch (error) {
      console.error("Unable to delete clothing item:", error);
    }
  };

  useEffect(() => {
    getweather(coordinates.latitude, coordinates.longitude, APIkey)
      .then((data) => setWeatherData(filterWeatherdata(data)))
      .catch((error) => console.error("Unable to load weather:", error));
    getItems()
      .then(setItems)
      .catch((error) => console.error("Unable to load clothing items:", error));
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header weatherData={weatherData} onAddClick={() => setActiveModal("add-item")} />
          <Routes>
            <Route
              path="/"
              element={<Main weatherData={weatherData} items={items} handleCardClick={handleCardClick} />}
            />
            <Route
              path="/profile"
              element={
                <Profile
                  items={items}
                  onCardClick={handleCardClick}
                  onAddClick={() => setActiveModal("add-item")}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
        <AddItemModal
          isOpen={activeModal === "add-item"}
          onAddItem={handleAddItem}
          onClose={closeActiveModal}
        />
        <ItemModal
          selectedCard={selectedCard || {}}
          activeModal={activeModal}
          onClose={closeActiveModal}
          onDelete={handleCardDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
