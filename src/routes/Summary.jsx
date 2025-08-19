import React, { useMemo } from "react";
import Button from "../components/Button.jsx";
import { useMealContext } from "../context/MealContext.jsx";
import { useNutritionCalc } from "../hooks/useNutritionCalc.js";
import { compareToMacros, compareToMicros } from "../utils/nutrientHelpers.js";
import StarRating from "../components/StarRating.jsx";
import HeaderBar from "../components/HeaderBar.jsx";
import { formatGrams } from "../utils/nutrientHelpers.js";
import "../styles/Summary.css";

export default function Summary() {
  const { basket } = useMealContext();
  const { macros, micros, macroRatios, microRatios, nutrientDiff } =
    useNutritionCalc(basket);
  const itemCount = basket.length;

  const combinedName = useMemo(() => {
    if (basket.length === 0) return "";
    if (basket.length === 1) return basket[0].name;
    const picks = new Set();
    while (picks.size < 2) {
      picks.add(basket[Math.floor(Math.random() * basket.length)].name);
    }
    return Array.from(picks).join(" ");
  }, [basket]);

  const avgRatio =
    (macroRatios.carbs +
      macroRatios.protein +
      macroRatios.fat +
      microRatios.cholesterol +
      microRatios.sodium +
      microRatios.potassium +
      microRatios.fiber +
      microRatios.sugar) /
    8;
  const starCount = Math.round(Math.min(avgRatio, 1) * 5);

  const { bestItem, worstItem } = useMemo(() => {
    if (basket.length === 0) return {};
    const scored = basket.map((item) => {
      const mac = compareToMacros(item.macros);
      const mic = compareToMicros(item.micros);
      return {
        item,
        score:
          mac.carbs +
          mac.protein +
          mac.fat +
          mic.cholesterol +
          mic.sodium +
          mic.potassium +
          mic.fiber +
          mic.sugar,
      };
    });
    scored.sort((a, b) => b.score - a.score);
    return {
      bestItem: scored[0].item,
      worstItem: scored[scored.length - 1].item,
    };
  }, [basket]);

  // for (const item of basket) {
  //   totalCalories += item.calories;
  //   macros.carbs += item.nutrients.carbs;
  //   macros.protein += item.nutrients.protein;
  //   macros.fat += item.nutrients.fat;
  // }

  const funFacts = [
    "Did you know that Vitamin C helps your body absorb iron more effectively? Pair your iron-rich foods with some citrus!",
    "Omega-3 fatty acids, found in fish like salmon and chia seeds, are crucial for brain health and can help reduce inflammation.",
    "Fiber, a type of carbohydrate, is essential for digestive health and can help regulate blood sugar levels. It's not just about regularity!",
    "Proteins are the building blocks of your body, essential for repairing tissues, making enzymes, and transporting oxygen.",
    "Calcium is not just for strong bones and teeth; it also plays a vital role in muscle function and nerve signaling.",
    "Iron is a key component of hemoglobin, the protein in red blood cells that carries oxygen from your lungs to the rest of your body.",
    "Electrolytes like sodium, potassium, and chloride are crucial for maintaining fluid balance, nerve impulses, and muscle contractions.",
    "B vitamins, a group of eight different vitamins, are essential for converting food into energy and for proper nerve function.",
    "Did you know that water is considered an essential nutrient? It makes up about 60% of your body weight and is involved in countless bodily functions!",
    "Magnesium, often overlooked, is involved in over 300 biochemical reactions in the body, including muscle and nerve function, blood glucose control, and blood pressure regulation.",
  ];

  const suggestions = {
    carbs: "Consider whole grains, fruits, and vegetables for steady energy.",
    protein: "Include lean meats, beans, or tofu to support muscle repair.",
    fat: "Incorporate healthy fats like avocados, nuts, and olive oil.",
    cholesterol: "Limit high-cholesterol foods; opt for plant-based proteins.",
    sodium: "Reduce salty snacks; season with herbs or citrus instead of salt.",
    potassium: "Add bananas, sweet potatoes, or spinach for potassium balance.",
    fiber: "Eat more legumes, whole grains, and leafy greens for digestion.",
    sugar:
      "Cut back on sugary drinks and desserts; choose natural fruit instead.",
  };
  const largest = Object.keys(nutrientDiff).reduce((a, b) =>
    nutrientDiff[a] > nutrientDiff[b] ? a : b
  );
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  const selectedFunFact = funFacts[randomIndex];

  return (
    <div className="summary-page">
      <HeaderBar />

      <header className="summary-header">
        <h1 className="summary-title">
          Summary <span className="item-count">{itemCount} items</span>
        </h1>
        <div className="summary-header-buttons">
          <Button to="/" className="start-over-button">
            Build your next meal
          </Button>
          <Button to="/basket" className="back-button">
            Back
          </Button>
        </div>
      </header>

      <h1 className="summary-title">
        {combinedName} &nbsp; &nbsp; &nbsp; &nbsp;
        <StarRating rating={starCount} />
      </h1>
      <h1> </h1>

      <div className="content-grid">
        <div className="nutrients-summary-box">
          <h2 className="nutrients-summary-title">Nutrients Summary</h2>
          <div className="nutrients-columns">
            <div className="nutrients-column">
              <br></br>
              <h3 className="nutrient-category">Macronutrients</h3>
              <p className="nutrient-item">
                Carbohydrates{" "}
                <span className="nutrient-value">
                  {formatGrams("", macros.carbs)}
                </span>
              </p>
              <p className="nutrient-item">
                Protein{" "}
                <span className="nutrient-value">
                  {formatGrams("", macros.protein)}
                </span>
              </p>
              <p className="nutrient-item">
                Fats{" "}
                <span className="nutrient-value">
                  {formatGrams("", macros.fat)}
                </span>
              </p>
              <br></br>
              <h3 className="nutrient-category">Micronutrients</h3>
              <p className="nutrient-item">
                Cholesterol
                <span className="nutrient-value">
                  {formatGrams("Cholesterol", micros.cholesterol)}
                </span>
              </p>
              <p className="nutrient-item">
                Fiber
                <span className="nutrient-value">
                  {formatGrams("", micros.fiber)}
                </span>
              </p>
              <p className="nutrient-item">
                Sugar
                <span className="nutrient-value">
                  {formatGrams("", micros.sugar)}
                </span>
              </p>
              <p className="nutrient-item">Minerals</p>
              <p className="nutrient-item-sub">
                Sodium{" "}
                <span className="nutrient-value">
                  {formatGrams("Sodium", micros.sodium)}
                </span>
              </p>
              <p className="nutrient-item-sub">
                Potassium{" "}
                <span className="nutrient-value">
                  {formatGrams("Potassium", micros.potassium)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="fun-fact-suggestions-box">
          <h2 className="fun-fact-title">Fun Fact</h2>
          <p className="fun-fact-text">{selectedFunFact}</p>

          <h2 className="suggestions-title">Suggestions</h2>
          <p className="suggestions-text">{suggestions[largest]}</p>
        </div>
        <div className="choices-section">
          {bestItem && (
            <div className="choice-card">
              <h2 className="choice-title">Best choice</h2>
              <img
                src={bestItem.imageUrl}
                alt={bestItem.name}
                className="choice-img"
              />
              <div className="choice-info">
                <p className="choice-text">
                  <b>{bestItem.name}</b>
                  <br />
                  {bestItem.calories} kcal
                </p>
              </div>
            </div>
          )}
          {worstItem && (
            <div className="choice-card">
              <h2 className="choice-title">Worst choice</h2>
              <img
                src={worstItem.imageUrl}
                alt={worstItem.name}
                className="choice-img"
              />
              <div className="choice-info">
                <p className="choice-text">
                  <b>{worstItem.name}</b>
                  <br />
                  {worstItem.calories} kcal
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
