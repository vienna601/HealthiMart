import React, { useMemo } from "react";
import { useMealContext } from "../context/MealContext.jsx";
import { useNutritionCalc } from "../hooks/useNutritionCalc.js"; // :contentReference[oaicite:4]{index=4}
import { compareToRDI, formatNutrients } from "../utils/nutrientHelpers.js"; // :contentReference[oaicite:5]{index=5}
import StarRating from "../components/StarRating.jsx";
import Button from "../components/Button.jsx";
import HeaderBar from "../components/HeaderBar.jsx";
import "../styles/Receipt.css";

export default function Receipt() {
  const { basket } = useMealContext();

  // 1. Compute overall nutrition summary
  const { totalCalories, macros, macroRatios } = useNutritionCalc(basket);

  // 2. Combined name: pick two distinct random items
  const combinedName = useMemo(() => {
    if (basket.length === 0) return "";
    if (basket.length === 1) return basket[0].name;
    const picks = new Set();
    while (picks.size < 2) {
      picks.add(basket[Math.floor(Math.random() * basket.length)].name);
    }
    return Array.from(picks).join(" ");
  }, [basket]);

  // 3. Star rating: average of macroRatios clamped to 1 → 0–5 stars
  const avgRatio =
    (macroRatios.carbs + macroRatios.protein + macroRatios.fat) / 3;
  const starCount = Math.round(Math.min(avgRatio, 1) * 5);

  // 4. Best/Worst items by sum of individual RDI ratios
  const { bestItem, worstItem } = useMemo(() => {
    if (basket.length === 0) return {};
    // score each item by sum of its macro ratios
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

  return (
    <div className="receipt-page">
      <HeaderBar></HeaderBar>
      {/* Header with combined name & stars */}
      <header className="receipt-header">
        <h1 className="receipt-title">{combinedName}</h1>
        <StarRating rating={starCount} />
      </header>

      {/* Main body: Nutrition Facts + choices */}
      <div className="receipt-body">
        {/* Best & Worst choice cards */}
        <div className="choices-section">
          {bestItem && (
            <div className="choice-card">
              <h3>Best choice:</h3>
              <img
                src={bestItem.imageUrl}
                alt={bestItem.name}
                className="choice-img"
              />
              <div className="choice-info">
                <h4>{bestItem.name}</h4>
                <p>{bestItem.calories} kcal</p>
              </div>
            </div>
          )}
          {worstItem && (
            <div className="choice-card">
              <h3>Worst choice:</h3>
              <img
                src={worstItem.imageUrl}
                alt={worstItem.name}
                className="choice-img"
              />
              <div className="choice-info">
                <h4>{worstItem.name}</h4>
                <p>{worstItem.calories} kcal</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with confirm button */}
      <footer className="receipt-footer">
        <Button to="/summary" icon="arrow">
          Next
        </Button>
      </footer>
    </div>
  );
}
