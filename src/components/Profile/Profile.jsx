import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "./Profile.css";

function Profile({ items, onCardClick, onAddClick }) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection items={items} onCardClick={onCardClick} onAddClick={onAddClick} />
    </main>
  );
}

export default Profile;
