import { Link } from "react-router-dom";
import HeaderBar from "../components/HeaderBar.jsx";
import Button from "../components/Button.jsx";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <HeaderBar></HeaderBar>
      <div className="home-content">
        <p className="home-subtitle">HealthiMart</p>
        <h1 className="home-title">Build Your Meal</h1>
        <Button to="/menu">Start</Button>
      </div>
    </div>
  );
}
