import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Terrence Tegegne</h2>
      <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
    </aside>
  );
}

export default SideBar;
