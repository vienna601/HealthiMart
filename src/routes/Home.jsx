// src/routes/Home.jsx
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-page">
      {/* The background image is now applied via CSS to .home-page */}
      {/* Remove or comment out the img tag if it's still present to avoid duplicates */}
      {/* <img
        src="/assets/images/homepage.png"
        alt="A closed cabinet."
        className="home-cabinet-img"
      /> */}
      <div className="home-content">
        <p className="home-subtitle">HealthiMart</p> {/* Now the smaller text */}
        <h1 className="home-title">Build Your Meal</h1> {/* Now the larger title */}
        <Button to="/menu">Start</Button>
      </div>
    </div>
  );
}
