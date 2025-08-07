// src/routes/Menu.jsx
import { useMealContext } from "../context/MealContext.jsx";
import FoodGroupMenu from "../components/FoodGroupMenu.jsx";
import Button from "../components/Button.jsx";
import "../styles/Menu.css"; // Styles for the overall page layout

export default function Menu() {
  const { basket, selectedGroup, setSelectedGroup } = useMealContext();

  // Define the food groups to be displayed in the menu
  const foodGroups = [
    "fruits",
    "vegetables",
    "protein",
    "grains",
    "dairy",
    "fats",
  ];

  return (
    <div className="menu-page">
      {/* Cabinet background image, similar to FoodRack */}
      <img
        src="/assets/images/cabinet.png"
        alt="Open cabinet interior."
        className="menu-cabinet-bg"
      />

      <header className="menu-header">
        <h1 className="menu-title">Ingredients</h1>
        <p className="menu-subtitle">
          Hover over a group to see what's inside.
        </p>
      </header>

      {/* FoodGroupMenu component for the interactive hover menu */}
      <FoodGroupMenu
        groups={foodGroups}
        onSelectGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
      />

      {/* Button to navigate to the FoodRack, showing items of the selected group */}
      <Button to="/rack" icon="arrow" className="menu-proceed-btn">
        View {selectedGroup.charAt(0).toUpperCase() + selectedGroup.slice(1)}
      </Button>

      {/* Button to view the shopping basket */}
      <Button to="/basket" className="basket-button">
        Basket ({basket.length})
      </Button>
    </div>
  );
}
