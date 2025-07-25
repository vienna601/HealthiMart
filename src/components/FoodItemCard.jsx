import { useState, useContext } from "react";
import { MealContext } from "../context/MealContext.jsx";
import NutrientList from "./NutrientList.jsx";
import { compareToRDI } from "../utils/nutrientHelpers.js";

//TODO: rough outline, refine in conjunction with css for popup styling
export default function FoodItemCard({ item }) {
  const { addItem } = useContext(MealContext);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      className="food-item-card"
      onClick={() => addItem(item)}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      {/* 1. Image */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="food-item-card__img"
      />

      {/* 2. Overlay name & calories */}
      <div className="food-item-card__info">
        <h4>{item.name}</h4>
        <span>{item.calories} kcal</span>
      </div>

      {/* 3. Hover popup */}
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
