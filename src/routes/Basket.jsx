// src/routes/Basket.jsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import HeaderBar from "../components/HeaderBar.jsx";
import { useMealContext } from "../context/MealContext.jsx";
import { useNutritionCalc } from "../hooks/useNutritionCalc.js"; // Import your useNutritionCalc hook
import { formatGrams } from "../utils/nutrientHelpers.js"; // Import formatGrams
import "../styles/Basket.css";
import NutrientList from "../components/NutrientList.jsx";
import { compareToMacros, compareToMicros } from "../utils/nutrientHelpers.js";

export default function Basket() {
  const { basket, removeItem, clearBasket } = useMealContext();
  const { totalCalories, macros, micros } = useNutritionCalc(basket); // Get calculated data

  // Prepare nutrients for display in the right sidebar
  const nutrientsList = {
    totalCalories: totalCalories.toFixed(0), // No 'g' or 'kcal' here, added in JSX
    carbohydrates: macros.carbs,
    protein: macros.protein,
    fats: macros.fat,
    cholesterol: micros.cholesterol,
    fibre: micros.fiber, // 'fiber' in useNutritionCalc, 'fibre' in display
    sodium: micros.sodium,
    sugars: micros.sugar,
    potassium: micros.potassium,
  };

  const handleClearBasket = () => {
    clearBasket(); // Calls the clearBasket function from MealContext
  };

  return (
    <div className="basket-page">
      <HeaderBar /> {/* Your HealthiMart header */}
      <header className="basket-header">
        <h1 className="basket-title">
          Basket <span className="item-count">{basket.length} items</span>
        </h1>
        <div className="basket-header-buttons">
          <Button to="/" className="start-over-button">
            Start over
          </Button>
          <Button to="/menu" className="back-button">
            Back
          </Button>
        </div>
      </header>
      {/* Main content area for two columns: Food Grid + Nutrient List */}
      <div className="basket-main-content">
        <div className="basket-content">
          {basket.length === 0 ? (
            <p className="empty-msg">Your basket is empty.</p>
          ) : (
            <div className="basket-grid">
              {basket.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="basket-item-card">
                  {/* remove button */}
                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ×
                  </button>

                  {/* image */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="basket-item-img"
                  />

                  {/* info */}
                  <div className="basket-item-info">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-calories">{item.calories} kcal</p>

                    <div className="item-nutrients">
                      <NutrientList
                        nutrients={item.macros}
                        compareFn={compareToMacros}
                      />
                    </div>
                    <div className="item-nutrients">
                      <NutrientList
                        nutrients={item.micros}
                        compareFn={compareToMicros}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right column: Nutrients List and action buttons */}
        <div className="nutrients-list-sidebar">
          <h2 className="nutrients-list-title">Nutrients List</h2>
          <div className="nutrient-rows-container">
            <div className="nutrient-row">
              <span className="nutrient-label">Total Calories</span>
              <span className="nutrient-value">
                {nutrientsList.totalCalories} kcal
              </span>
            </div>
          </div>
          <div className="nutrient-rows-container">
          <br></br>
          <h3 className="nutrient-category-title">Macronutrients</h3>
            <div className="nutrient-row">
              <span className="nutrient-label">Carbohydrates</span>
              <span className="nutrient-value">
                {formatGrams("Carbohydrates", nutrientsList.carbohydrates)}
              </span>
            </div>
            <div className="nutrient-row">
              <span className="nutrient-label">Protein</span>
              <span className="nutrient-value">
                {formatGrams("Protein", nutrientsList.protein)}
              </span>
            </div>
            <div className="nutrient-row">
              <span className="nutrient-label">Fat</span>
              <span className="nutrient-value">
                {formatGrams("Fats", nutrientsList.fats)}
              </span>
            </div>
          </div>
          <div className="nutrient-rows-container">
            <br></br>
            <h3 className="nutrient-category-title">Micronutrients</h3>
            <div className="nutrient-row">
              <span className="nutrient-label">Cholesterol</span>
              <span className="nutrient-value">
                {formatGrams("Cholesterol", nutrientsList.cholesterol)}
              </span>
            </div>
            <div className="nutrient-row">
              <span className="nutrient-label">Sodium</span>
              <span className="nutrient-value">
                {formatGrams("Sodium", nutrientsList.sodium)}
              </span>
            </div>
            <div className="nutrient-row">
              <span className="nutrient-label">Potassium</span>
              <span className="nutrient-value">
                {formatGrams("Potassium", nutrientsList.potassium)}
              </span>
            </div>
            <div className="nutrient-row">
              <span className="nutrient-label">Fiber</span>
              <span className="nutrient-value">
                {formatGrams("Fiber", nutrientsList.fibre)}
              </span>{" "}
            </div>
            <div className="nutrient-row">
              <span className="nutrient-label">Sugar</span>
              <span className="nutrient-value">
                {formatGrams("Sugar", nutrientsList.sugars)}
              </span>
            </div>
          </div>
          <div className="nutrients-list-buttons">
            <Button onClick={handleClearBasket} className="clear-basket-button">
              Clear Basket
            </Button>
          </div>
        </div>
      </div>
      <footer className="basket-footer">
        {/* This footer can be used for global basket page elements or left empty */}
        <div className="nutrients-list-buttons">
          <Button to="/summary" icon="arrow" className="checkout-button">
            Checkout
          </Button>
        </div>
      </footer>
    </div>
  );
}
