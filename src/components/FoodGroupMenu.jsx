import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../styles/FoodGroupMenu.css";

export default function FoodGroupMenu({
  groups,
  onSelectGroup,
  selectedGroup,
}) {
  const navigate = useNavigate();

  const topGroups = groups.slice(0, groups.length - 2);
  const bottomGroups = groups.slice(groups.length - 2);

  const handleGroupClick = (group) => {
    onSelectGroup(group);
    navigate("/rack", { state: { foodGroup: group } });
  };

  return (
    <nav className="food-group-menu">
      <h1 className="food-group-menu-title">Ingredients</h1>
      <ul className="food-group-list">
        {topGroups.map((group) => (
          <li
            key={group}
            className={`food-group-item food-group-item--${group} ${
              selectedGroup === group ? "is-selected" : ""
            }`}
            onMouseEnter={() => onSelectGroup(group)}
            onClick={() => handleGroupClick(group)}
          >
            <h2 className="food-group-name">
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </h2>
          </li>
        ))}
        <li className="food-group-item-wrapper">
          <div className="food-group-bottom-row">
            {bottomGroups.map((group) => (
              <div
                key={group}
                className={`food-group-item food-group-item--${group} ${
                  selectedGroup === group ? "is-selected" : ""
                }`}
                onMouseEnter={() => onSelectGroup(group)}
                onClick={() => handleGroupClick(group)}
              >
                <h2 className="food-group-name">
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </h2>
              </div>
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
