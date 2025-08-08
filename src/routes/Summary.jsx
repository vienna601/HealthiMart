// src/routes/Summary.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMealContext } from "../context/MealContext.jsx";
import StarRating from "../components/StarRating.jsx";
import Button from "../components/Button.jsx";
import HeaderBar from "../components/HeaderBar.jsx";
import "../styles/Summary.css";

export default function Summary() {
  const {
    nutritionSummary: { macros, macrosRemaining, totalCalories },
    clearBasket,
  } = useMealContext();
  const navigate = useNavigate();

  // Determine star rating based on how balanced the macros are.
  const rating = useMemo(() => {
    // Define RDI for reference (should match useNutritionCalc hook)
    const RDI = {
      carbs: 300,
      protein: 50,
      fat: 70,
    };

    let score = 0;
    // Award points for each macro being within a "good" range (e.g., 50-120% of RDI)
    if (macros.carbs >= RDI.carbs * 0.5 && macros.carbs <= RDI.carbs * 1.2) {
      score += 1;
    }
    if (
      macros.protein >= RDI.protein * 0.5 &&
      macros.protein <= RDI.protein * 1.2
    ) {
      score += 1;
    }
    if (macros.fat >= RDI.fat * 0.5 && macros.fat <= RDI.fat * 1.2) {
      score += 1;
    }

    // Add bonus for overall calorie count being reasonable (e.g., 1500-2500 kcal)
    if (totalCalories >= 1500 && totalCalories <= 2500) {
      score += 1;
    }

    // Add a bonus for having a good mix (e.g., all three macros present)
    if (macros.carbs > 0 && macros.protein > 0 && macros.fat > 0) {
      score += 1;
    }

    // Clamp the score between 0 and 5 stars
    return Math.min(Math.max(0, score), 5);
  }, [macros, totalCalories]);

  // Generate feedback messages
  const feedback = useMemo(() => {
    const messages = {
      excess: [],
      deficit: [],
      balanced: [],
    };

    // Define RDI for reference (should match useNutritionCalc hook)
    const RDI = {
      carbs: 300,
      protein: 50,
      fat: 70,
    };

    // Check for deficits
    if (macrosRemaining.carbs > RDI.carbs * 0.3) {
      // If more than 30% of RDI is missing
      messages.deficit.push("carbohydrates");
    }
    if (macrosRemaining.protein > RDI.protein * 0.3) {
      messages.deficit.push("protein");
    }
    if (macrosRemaining.fat > RDI.fat * 0.3) {
      messages.deficit.push("fats");
    }

    // Check for excesses (e.g., more than 120% of RDI)
    if (macros.carbs > RDI.carbs * 1.2) {
      messages.excess.push("carbohydrates");
    }
    if (macros.protein > RDI.protein * 1.2) {
      messages.excess.push("protein");
    }
    if (macros.fat > RDI.fat * 1.2) {
      messages.excess.push("fats");
    }

    // If no major deficits or excesses, it's balanced
    if (messages.deficit.length === 0 && messages.excess.length === 0) {
      messages.balanced.push("You've created a well-balanced meal!");
    }

    return messages;
  }, [macros, macrosRemaining]);

  // Handle button clicks to start a new meal
  const handleNewMeal = () => {
    clearBasket(); // Clear the basket for a new meal
    navigate("/menu"); // Navigate back to the menu to start fresh
  };

  return (
    <div className="summary-page">
      <HeaderBar></HeaderBar>
      <header className="summary-header">
        <h1 className="summary-title">Your Meal Summary</h1>
        <StarRating rating={rating} />
        <span className="summary-calories">
          {totalCalories.toFixed(0)} kcal
        </span>
      </header>

      <div className="summary-content">
        <section className="summary-feedback">
          {feedback.balanced.length > 0 && (
            <p className="feedback-message-great">
              🎉 {feedback.balanced[0]} Excellent job!
            </p>
          )}
          {feedback.excess.length > 0 && (
            <p className="feedback-message-bad">
              ⚠️ You have an excess of: **{feedback.excess.join(", ")}**.
              Consider reducing these for better balance.
            </p>
          )}
          {feedback.deficit.length > 0 && (
            <p className="feedback-message-good">
              💡 Try adding more **{feedback.deficit.join(", ")}** for a more
              balanced meal!
            </p>
          )}
        </section>

        <section className="summary-receipt-view">
          {/* This image represents the nutrition facts label */}
          <img
            src="/assets/images/nutrition-facts.png"
            alt="A simplified nutrition facts label."
            className="summary-nutrition-img"
          />
        </section>
      </div>

      <footer className="summary-footer">
        <Button onClick={handleNewMeal}>Start a New Meal</Button>
      </footer>
    </div>
  );
}
