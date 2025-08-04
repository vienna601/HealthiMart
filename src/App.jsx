import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/Home.jsx";
import Menu from "./routes/Menu.jsx";
import FoodRack from "./routes/FoodRack.jsx";
import Basket from "./routes/Basket.jsx";
import Receipt from "./routes/Receipt.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/rack" element={<FoodRack />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/receipt" element={<Receipt />} />
    </Routes>
  );
}
