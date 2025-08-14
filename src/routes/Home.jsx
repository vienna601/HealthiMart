import { Link } from "react-router-dom";
import HeaderBar from "../components/HeaderBar.jsx";
import Button from "../components/Button.jsx";
import "../styles/Home.css";
import { useMealContext } from "../context/MealContext.jsx";

export default function Home() {
  const { clearBasket } = useMealContext();
  return (
    <div className="home-page">
      <HeaderBar></HeaderBar>
      <div className="home-content">
        <p className="home-subtitle">HealthiMart</p>
        <h1 className="home-title">Build Your Meal</h1>
        <Button to="/menu" onClick={clearBasket}>
          Start
        </Button>
      </div>
    </div>
  );
}
