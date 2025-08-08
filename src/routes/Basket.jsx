import { useMealContext } from "../context/MealContext.jsx";
import NutrientList from "../components/NutrientList.jsx";
import { compareToRDI } from "../utils/nutrientHelpers.js";
import Button from "../components/Button.jsx";
import HeaderBar from "../components/HeaderBar.jsx";
import "../styles/Basket.css";

export default function Basket() {
  const {
    basket,
    removeItem,
    clearBasket,
    nutritionSummary: { totalCalories, macros },
  } = useMealContext();

  return (
    <div className="basket-page">
      <HeaderBar></HeaderBar>
      {/* Header */}
      <header className="basket-header">
        <h1>Basket</h1>
        <span className="basket-count">{basket.length} items</span>
      </header>

      {/* Scrollable content */}
      <div className="basket-content">
        {basket.length === 0 ? (
          <p className="empty-msg">Your basket is empty.</p>
        ) : (
          <div className="basket-grid">
            {basket.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="basket-item-card">
                {/* remove button */}
                <button
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  ×
                </button>

                {/* image */}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="basket-item-img"
                />

                {/* info */}
                <div className="basket-item-info">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-calories">{item.calories} kcal</p>

                  <div className="item-nutrients">
                    <NutrientList
                      nutrients={item.nutrients}
                      compareFn={compareToRDI}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky footer with totals & confirm */}
      <footer className="basket-footer">
        <div className="totals">
          <p>
            <strong>Total Calories:</strong> {totalCalories} kcal
          </p>
          <p>
            <strong>Carbs:</strong> {macros.carbs.toFixed(1)} g 
            <strong>Protein:</strong> {macros.protein.toFixed(1)} g 
            <strong>Fat:</strong> {macros.fat.toFixed(1)} g
          </p>
        </div>
        <Button onClick={clearBasket}>Clear</Button>
        <Button to="/receipt" icon="arrow">
          Checkout
        </Button>
      </footer>
    </div>
  );
}
