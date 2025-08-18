import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home.jsx"; // New route
import Menu from "./routes/Menu.jsx"; // New route
import FoodRack from "./routes/FoodRack.jsx";
import Basket from "./routes/Basket.jsx";
import Summary from "./routes/Summary.jsx"; // New route

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/rack" element={<FoodRack />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/summary" element={<Summary />} />
      <Route
        path="*"
        element={
          <div style={{ padding: "2rem", color: "crimson" }}>
            404 – Page not found: {window.location.pathname}
          </div>
        }
      />
    </Routes>
  );
}
