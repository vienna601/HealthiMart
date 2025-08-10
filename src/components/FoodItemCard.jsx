import { useState } from "react";
import { useMealContext } from "../context/MealContext.jsx";
import NutrientList from "./NutrientList.jsx";
import "../styles/NutrientList.css";
import { compareToRDI } from "../utils/nutrientHelpers.js";

export default function FoodItemCard({ item }) {
  const { addItem } = useMealContext();
  const handleClick = () => {
    addItem(item);
  };
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className="food-item-card"
      onClick={handleClick}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="food-item-card__img"
        style={{ width: 128, height: 128, objectFit: "contain" }}
      />

      <div className="food-item-card__info">
        <h4>{item.name}</h4>
        <span>{item.calories} kcal</span>
      </div>

      {showInfo && (
        <div className="food-item-card__popup">
          <h5>Fun Fact</h5>
          <p>{item.funFact}</p>
          <h5>Nutrients</h5>
          <NutrientList nutrients={item.nutrients} compareFn={compareToRDI} />
        </div>
      )}
    </div>
  );
}
