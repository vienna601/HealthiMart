import React from "react";
import { formatGrams } from "../utils/nutrientHelpers.js";
import "../styles/NutrientList.css";

export default function NutrientList({ nutrients, compareFn }) {
  // 1. Compute ratios (e.g. carbs/300g, protein/50g, fat/70g)
  const ratios = compareFn ? compareFn(nutrients) : {};

  return (
    <ul className="nutrient-list">
      {Object.entries(nutrients).map(([key, grams]) => {
        // Capitalize key for label
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        // Ratio for this macro (undefined → 0)
        const ratio = ratios[key] ?? 0;

        // 2. Determine a status class
        let statusClass = "";
        if (ratio >= 1) statusClass = "nutrient-list__item--high";
        else if (ratio >= 0.5) statusClass = "nutrient-list__item--medium";
        else statusClass = "nutrient-list__item--low";

        return (
          <li
            key={key}
            className={`nutrient-list__item ${compareFn ? statusClass : ""}`}
          >
            <span className="nutrient-list__label">{label}</span>
            <span className="nutrient-list__value">{formatGrams(grams)}</span>
          </li>
        );
      })}
    </ul>
  );
}
