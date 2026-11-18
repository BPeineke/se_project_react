import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "./Profile.css";

function Profile({
  items,
  onCardClick,
  onCardLike,
  onAddClick,
  onEditProfileClick,
  onSignOut,
}) {
  return (
    <main className="profile">
      <SideBar
        onEditProfileClick={onEditProfileClick}
        onSignOut={onSignOut}
      />
      <ClothesSection
        items={items}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onAddClick={onAddClick}
      />
    </main>
  );
}

export default Profile;
