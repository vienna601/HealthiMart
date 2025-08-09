// src/routes/Menu.jsx
import { useMealContext } from "../context/MealContext.jsx";
import FoodGroupMenu from "../components/FoodGroupMenu.jsx";
import Button from "../components/Button.jsx";
import "../styles/Menu.css"; // Styles for the overall page layout

export default function Menu() {
  const { basket, selectedGroup, setSelectedGroup } = useMealContext();

  // Define the food groups to be displayed in the menu, reordered to match design
  const foodGroups = [
    "fats",       // Topmost in the design
    "protein",
    "dairy",
    "grains",
    "fruits",
    "vegetables", // Bottommost in the design
  ];

  return (
    <div className="menu-page">
      {/* Cabinet background image, similar to FoodRack */}
      <img
        src="/assets/images/cabinet.png"
        alt="Open cabinet interior."
        className="menu-cabinet-bg"
      />

      {/* Removed the header containing the Ingredients title, as it will now be inside FoodGroupMenu */}
      {/* <header className="menu-header">
        <h1 className="menu-title">Ingredients</h1>
      </header> */}

      {/* FoodGroupMenu component for the interactive hover menu */}
      <FoodGroupMenu
        groups={foodGroups}
        onSelectGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
      />

      {/* Button to navigate to the FoodRack, showing items of the selected group */}
      {/* Not visible in the desired design for this page */}
      {/* <Button to="/rack" icon="arrow" className="menu-proceed-btn">
        View {selectedGroup.charAt(0).toUpperCase() + selectedGroup.slice(1)}
      </Button> */}

      {/* Button to view the shopping basket */}
      {/* Not visible in the desired design for this page in the main layout */}
      <Button to="/basket" className="basket-button">
        Basket ({basket.length})
      </Button>
    </div>
  );
}
