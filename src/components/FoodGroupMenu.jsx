// src/components/FoodGroupMenu.jsx
import React from "react";
import PropTypes from "prop-types";
import "../styles/FoodGroupMenu.css"; // Styles for this specific component

export default function FoodGroupMenu({ groups, onSelectGroup, selectedGroup }) {
  return (
    <nav className="food-group-menu">
      <ul className="food-group-list">
        {groups.map((group) => (
          <li
            key={group}
            // Added dynamic class for specific styling
            className={`food-group-item food-group-item--${group} ${
              selectedGroup === group ? "is-selected" : ""
            }`}
            onMouseEnter={() => onSelectGroup(group)} // Update selected group on hover
          >
            <h2 className="food-group-name">
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </h2>
          </li>
        ))}
      </ul>
    </nav>
  );
}

FoodGroupMenu.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectGroup: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string.isRequired,
};
