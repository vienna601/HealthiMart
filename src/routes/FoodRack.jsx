import { useMemo } from "react";
import { getItemsByGroup } from "../data/food‑items.js";
import FoodItemCard from "../components/FoodItemCard.jsx";
import { useMealContext } from "../context/MealContext.jsx";
import { chunkArray } from "../utils/storage.js";

export default function FoodRack() {
  const { selectedGroup } = useMealContext();

  // filter + chunk into rows of 4 (or 3) items
  const rows = useMemo(() => {
    const groupItems = getItemsByGroup(selectedGroup);
    return chunkArray(groupItems, 4); // e.g. [[item,…],[…],[…]]
  }, [selectedGroup]);

  return (
    <div className="food-rack-page">
      {/* background */}
      <img
        src="../assets/images/cabinet.png"
        alt="Open cabinet"
        className="cabinet-bg"
      />

      {/* shelves */}
      {rows.map((row, i) => (
        <div key={i} className={`shelf-row shelf-row--${i}`}>
          {row.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
