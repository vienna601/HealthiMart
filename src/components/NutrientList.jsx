import React from "react";
import PropTypes from "prop-types";
import { formatGrams } from "../utils/nutrientHelpers.js";
import "../styles/NutrientList.css";

export default function NutrientList({ nutrients }) {
  return (
    <ul className="nutrient-list">
      {Object.entries(nutrients).map(([key, grams]) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        return (
          <li key={key} className={"nutrient-list__item"}>
            <span className="nutrient-list__label">{label}</span>
            <span className="nutrient-list__value">
              {formatGrams(label, grams)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
