// src/routes/Summary.jsx
import React from "react";
import { Link } from "react-router-dom"; // Assuming Link is used for navigation
import Button from "../components/Button.jsx"; // Reusing the Button component
import "../styles/Summary.css"; // Styles for the Summary page

export default function Summary() {
  // Placeholder data for demonstration. You would get real data from context/state.
  const itemCount = 3; // Example: Replace with actual basket.length or calculated items
  const nutrients = {
    macronutrients: {
      carbohydrates: "150",
      protein: "50",
      fats: "30",
    },
    micronutrients: {
      vitamins: {
        a: "500",
        c: "90",
        d: "15",
      },
      minerals: {
        calcium: "1000",
        iron: "18",
        sodium: "2300",
      },
    },
    others: {
      cholesterol: "300",
      fibre: "25",
      sugars: "40",
    },
  };

  const funFact = "Some fun facts about anything on nutrition.";
  const suggestions = "Green, yellow or red to warn or suggest a change in their meal + what they're missing";

  return (
    <div className="summary-page">
      

      <header className="summary-header">
        <h1 className="summary-title">Summary <span className="item-count">{itemCount} items</span></h1>
        <div className="summary-header-buttons">
          <Button to="/" className="start-over-button">Start over</Button>
          <Button to="/menu" className="back-button">Back</Button>
        </div>
      </header>

      <div className="meal-naming-section">
        <p className="meal-name-label">Name your meal:</p>
        <input type="text" className="meal-name-input" placeholder="" />
      </div>

      <div className="content-grid">
        <div className="nutrients-summary-box">
          <h2 className="nutrients-summary-title">Nutrients Summary</h2>
          <div className="nutrients-columns">
            <div className="nutrients-column">
              <h3 className="nutrient-category">Macronutrients</h3>
              <p className="nutrient-item">Carbohydrates <span className="nutrient-value">{nutrients.macronutrients.carbohydrates} g</span></p>
              <p className="nutrient-item">Protein <span className="nutrient-value">{nutrients.macronutrients.protein} g</span></p>
              <p className="nutrient-item">Fats <span className="nutrient-value">{nutrients.macronutrients.fats} g</span></p>

              <h3 className="nutrient-category">Micronutrients</h3>
              <p className="nutrient-item">Vitamins</p>
              <p className="nutrient-item-sub">A <span className="nutrient-value">{nutrients.micronutrients.vitamins.a} g</span></p>
              <p className="nutrient-item-sub">C <span className="nutrient-value">{nutrients.micronutrients.vitamins.c} g</span></p>
              <p className="nutrient-item-sub">D <span className="nutrient-value">{nutrients.micronutrients.vitamins.d} g</span></p>
              <p className="nutrient-item">Minerals</p>
              <p className="nutrient-item-sub">Calcium <span className="nutrient-value">{nutrients.micronutrients.minerals.calcium} g</span></p>
              <p className="nutrient-item-sub">Iron <span className="nutrient-value">{nutrients.micronutrients.minerals.iron} g</span></p>
            </div>
            <div className="nutrients-column">
              <h3 className="nutrient-category">Others</h3>
              <p className="nutrient-item">Cholesterol <span className="nutrient-value">{nutrients.others.cholesterol} g</span></p>
              <p className="nutrient-item">Fibre <span className="nutrient-value">{nutrients.others.fibre} g</span></p>
              <p className="nutrient-item">Sodium <span className="nutrient-value">{nutrients.others.sodium} g</span></p>
              <p className="nutrient-item">Sugars <span className="nutrient-value">{nutrients.others.sugars} g</span></p>
            </div>
          </div>
        </div>

        {/* Combined Fun Fact and Suggestions Box */}
        <div className="fun-fact-suggestions-box"> {/* Renamed container */}
          <h2 className="fun-fact-title">Fun Fact</h2>
          <p className="fun-fact-text">{funFact}</p>
          
          <h2 className="suggestions-title">Suggestions</h2>
          <p className="suggestions-text">{suggestions}</p>

          {/* Moved footer buttons here for positioning within this box */}
          {/* <div className="summary-action-buttons">
            <Button to="/share" className="share-meal-button">Share your meal</Button>
            <Button to="/" className="build-next-meal-button">Build your next meal</Button>
          </div> */}
        </div>
      </div>
      {/* Moved original footer here as buttons are now direct children of summary-page */}
      <footer className="summary-footer-buttons">
        <Button to="/share" className="share-meal-button">Share your meal</Button>
        <Button to="/" className="build-next-meal-button">Build your next meal</Button>
      </footer>
    </div>
  );
}
