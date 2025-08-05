import React from "react";
import { Routes, Route } from "react-router-dom";
import FoodRack from "./routes/FoodRack.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FoodRack />} />
    </Routes>
  );
}
/*
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home.jsx";
import Menu from "./routes/Menu.jsx";
import FoodRack from "./routes/FoodRack.jsx";
import Basket from "./routes/Basket.jsx";
import Receipt from "./routes/Receipt.jsx";
import { MealProvider } from "./context/MealContext.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<Home />} />
      <Route path="/menu"     element={<Menu />} />
      <Route path="/rack"     element={<FoodRack />} />
      <Route path="/basket"   element={<Basket />} />
      <Route path="/receipt"  element={<Receipt />} />
      <Route
        path="*"
        element={
          <div style={{ padding: "2rem", color: "crimson" }}>
            404 – Page not found: {window.location.pathname}
          </div>
        }
      />
    </Routes>
  )
}
*/
