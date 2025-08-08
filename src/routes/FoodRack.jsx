import { useMemo } from "react";
import { useMealContext } from "../context/MealContext.jsx";
import { getItemsByGroup } from "../data/food-items.js";
import { chunkArray } from "../utils/storage.js";
import FoodItemCard from "../components/FoodItemCard.jsx";
import Button from "../components/Button.jsx";
import HeaderBar from "../components/HeaderBar.jsx";
import "../styles/FoodRack.css";

export default function FoodRack() {
  const { selectedGroup, basket } = useMealContext();

  //only recompute when the group changes
  const rows = useMemo(() => {
    //error with group selection
    if (!selectedGroup) return [];
    //split items into 3 rows
    return chunkArray(getItemsByGroup(selectedGroup), 3);
  }, [selectedGroup]);

  return (
    <div className="food-rack-page">
      <HeaderBar></HeaderBar>
      {/* Cabinet background */}
      <img
        src="/assets/images/cabinet.png"
        alt="cabinet"
        className="cabinet-bg"
      />

      {/* Each shelf is a row of up to 3 cards */}
      {rows.map((rowItems, rowIndex) => (
        <div key={rowIndex} className={`shelf-row shelf-row--${rowIndex}`}>
          {rowItems.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
      ))}

      {/* Basket button */}
      <Button to="/basket" icon="arrow" className="basket-button">
        Basket ({basket.length})
      </Button>
    </div>
  );
}
