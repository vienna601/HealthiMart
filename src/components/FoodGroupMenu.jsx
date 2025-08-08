// src/components/FoodGroupMenu.jsx
import React from "react";
import PropTypes from "prop-types";
import "../styles/FoodGroupMenu.css"; // Styles for this specific component
import Button from "../components/Button.jsx";
import { useMealContext } from "../context/MealContext.jsx";

export default function FoodGroupMenu({ groups }) {
  const { selectedGroup, setSelectedGroup } = useMealContext();
  return (
    <nav className="food-group-menu">
      <ul className="food-group-list">
        {groups.map((group) => (
          <Button
            key={group}
            // Added dynamic class for specific styling
            className={`food-group-item food-group-item--${group} ${
              selectedGroup === group ? "is-selected" : ""
            }`}
            onClick={() => setSelectedGroup(group)} // Update selected group
            to="/rack"
          >
            <h2 className="food-group-name">
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </h2>
          </Button>
        ))}
      </ul>
    </nav>
  );
}
