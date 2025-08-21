import { useState } from "react";
import { useMealContext } from "../context/MealContext.jsx";
import NutrientList from "./NutrientList.jsx";
import "../styles/NutrientList.css";
import "../styles/FoodItemCard.css";
import { formatGrams } from "../utils/nutrientHelpers.js";

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

      {/* 3. Hover popup */}
      {/* full-cover hover card */}
      <div
        className={`food-item-card__hovercard ${showInfo ? "is-visible" : ""}`}
      >
        <p className="serving_size">
          <span className="popup__title">Serving Size</span>
          <span className="serving_size_text">
            {formatGrams("", item.servingSize)}
          </span>
        </p>
        <h5 className="popup__title">Macros</h5>
        <NutrientList nutrients={item.macros} />
        <h5 className="popup__title">Micros</h5>
        <NutrientList nutrients={item.micros} />
        <h5 className="popup__title">Fun Fact</h5>
        <p className="popup__text">{item.funFact}</p>
      </div>
    </div>
  );
}
