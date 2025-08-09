// src/components/FoodGroupMenu.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/FoodGroupMenu.css"; // Styles for this specific component

export default function FoodGroupMenu({ groups, onSelectGroup, selectedGroup }) {
  const navigate = useNavigate(); // Initialize navigate hook

  // Separate the last two groups (Fruits, Vegetables) for special layout
  const topGroups = groups.slice(0, groups.length - 2);
  const bottomGroups = groups.slice(groups.length - 2);

  const handleGroupClick = (group) => {
    onSelectGroup(group); // Still update selected group on click
    navigate("/rack", { state: { foodGroup: group } }); // Navigate to /rack with state
  };

  return (
    <nav className="food-group-menu">
      <h1 className="food-group-menu-title">Ingredients</h1> {/* Moved "Ingredients" here */}
      <ul className="food-group-list">
        {topGroups.map((group) => (
          <li
            key={group}
            className={`food-group-item food-group-item--${group} ${
              selectedGroup === group ? "is-selected" : ""
            }`}
            onMouseEnter={() => onSelectGroup(group)} // Keep hover effect
            onClick={() => handleGroupClick(group)} // Add click handler for navigation
          >
            <h2 className="food-group-name">
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </h2>
          </li>
        ))}
        {/* New container for Fruits and Vegetables to be side-by-side */}
        <li className="food-group-item-wrapper"> {/* Wrapper to contain bottom row for spacing in main list */}
          <div className="food-group-bottom-row">
            {bottomGroups.map((group) => (
              <li
                key={group}
                className={`food-group-item food-group-item--${group} ${
                  selectedGroup === group ? "is-selected" : ""
                }`}
                onMouseEnter={() => onSelectGroup(group)} // Keep hover effect
                onClick={() => handleGroupClick(group)} // Add click handler for navigation
              >
                <h2 className="food-group-name">
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </h2>
              </li>
            ))}
          </div>
        </li>
      </ul>
    </nav>
  );
}

FoodGroupMenu.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectGroup: PropTypes.func.isRequired,
  selectedGroup: PropTypes.string.isRequired,
};
