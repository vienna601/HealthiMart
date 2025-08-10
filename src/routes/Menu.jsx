import { useMealContext } from "../context/MealContext.jsx";
import HeaderBar from "../components/HeaderBar.jsx";
import FoodGroupMenu from "../components/FoodGroupMenu.jsx";
import Button from "../components/Button.jsx";
import "../styles/Menu.css";

export default function Menu() {
  const { basket, selectedGroup, setSelectedGroup } = useMealContext();

  const foodGroups = [
    "fats",       
    "protein",
    "dairy",
    "grains",
    "fruits",
    "vegetables",
  ];

  return (
    <div className="menu-page">
      <img
        src="/assets/images/cabinet.png"
        alt="Open cabinet interior."
        className="menu-cabinet-bg"
      />
      <HeaderBar></HeaderBar>
      <FoodGroupMenu
        groups={foodGroups}
        onSelectGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
      />

      <Button to="/basket" className="basket-button">
        Basket ({basket.length})
      </Button>
    </div>
  );
}
