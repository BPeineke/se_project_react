import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);
  return (
    <label className="toggle-switch" aria-label="Temperature unit">
      <span className={currentTemperatureUnit === "F" ? "toggle-switch__unit toggle-switch__unit_active" : "toggle-switch__unit"}>F</span>
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
        aria-label="Switch temperature unit to Celsius"
      />
      <span className="toggle-switch__track" aria-hidden="true"><span className="toggle-switch__thumb" /></span>
      <span className={currentTemperatureUnit === "C" ? "toggle-switch__unit toggle-switch__unit_active" : "toggle-switch__unit"}>C</span>
    </label>
  );
}

export default ToggleSwitch;
