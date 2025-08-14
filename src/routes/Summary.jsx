import React, { useMemo } from "react";
import Button from "../components/Button.jsx"; 
import { useMealContext } from "../context/MealContext.jsx";
import { useNutritionCalc } from "../hooks/useNutritionCalc.js"; 
import { compareToRDI, formatNutrients } from "../utils/nutrientHelpers.js";
import StarRating from "../components/StarRating.jsx";
import HeaderBar from "../components/HeaderBar.jsx";
import "../styles/Summary.css";

export default function Summary() {
  const { basket } = useMealContext();
  const { totalCalories, macros, macroRatios } = useNutritionCalc(basket);
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
    (macroRatios.carbs + macroRatios.protein + macroRatios.fat) / 3;
  const starCount = Math.round(Math.min(avgRatio, 1) * 5);

    const { bestItem, worstItem } = useMemo(() => {
      if (basket.length === 0) return {};
      const scored = basket.map((item) => {
        const r = compareToRDI(item.nutrients);
        return { item, score: r.carbs + r.protein + r.fat };
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
    "Magnesium, often overlooked, is involved in over 300 biochemical reactions in the body, including muscle and nerve function, blood glucose control, and blood pressure regulation."
  ];

  const randomIndex = Math.floor(Math.random() * funFacts.length);
  const selectedFunFact = funFacts[randomIndex];

  const suggestions = "Consider adding more leafy greens to boost your vitamin intake or incorporating nuts for healthy fats.";

  return (
    <div className="summary-page">
      <HeaderBar />

      <header className="summary-header">
        <h1 className="summary-title">Summary <span className="item-count">{itemCount} items</span></h1>
        <div className="summary-header-buttons">
          <Button to="/" className="start-over-button">Start over</Button>
          <Button to="/menu" className="back-button">Back</Button>
        </div>
      </header>

      <h1 className="summary-title">{combinedName} &nbsp; &nbsp; &nbsp; &nbsp;<StarRating rating={starCount} /></h1>
      <h1> </h1>

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

        <div className="fun-fact-suggestions-box">
          <h2 className="fun-fact-title">Fun Fact</h2>
          <p className="fun-fact-text">{selectedFunFact}</p>
          
          <h2 className="suggestions-title">Suggestions</h2>
          <p className="suggestions-text">{suggestions}</p>
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
                <p className="choice-text"><b>{bestItem.name}</b><br/>{bestItem.calories}kcal</p>
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
                <p className="choice-text"><b>{worstItem.name}</b><br/>{worstItem.calories}kcal</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="summary-footer-buttons">
        <Button to="/share" className="share-meal-button">Share your meal</Button>
        <Button to="/" className="build-next-meal-button">Build your next meal</Button>
      </footer>
    </div>
  );
}
