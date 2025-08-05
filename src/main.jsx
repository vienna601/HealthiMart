import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Boundary from "./Boundary.jsx";
import { MealProvider } from "./context/MealContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Boundary>
      <BrowserRouter>
        <MealProvider>
          <App />
        </MealProvider>
      </BrowserRouter>
    </Boundary>
  </React.StrictMode>
);
