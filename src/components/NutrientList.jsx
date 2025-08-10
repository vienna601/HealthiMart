import React from "react";
import PropTypes from "prop-types";
import { formatGrams } from "../utils/nutrientHelpers.js";
import "../styles/NutrientList.css";

export default function NutrientList({ nutrients, compareFn }) {
  const ratios = compareFn ? compareFn(nutrients) : {};

  return (
    <ul className="nutrient-list">
      {Object.entries(nutrients).map(([key, grams]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        const ratio = ratios[key] ?? 0;

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

NutrientList.propTypes = {
  nutrients: PropTypes.shape({
    carbs: PropTypes.number,
    protein: PropTypes.number,
    fat: PropTypes.number,
  }).isRequired,
  compareFn: PropTypes.func,
};
