import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useNutritionCalc } from "../hooks/useNutritionCalc.js";
import { loadBasket, saveBasket } from "../utils/storage.js";

const MealContext = createContext();

export function MealProvider({ children }) {
  //for updating current grp in food rack and array of objects in basket
  const [selectedGroup, setSelectedGroup] = useState("fruits");
  //get items from local storage
  const [basket, setBasket] = useState(() => loadBasket());
  useEffect(() => {
    saveBasket(basket);
  }, [basket]);

  const addItem = (item) => {
    setBasket((curr) => [...curr, item]);
  };
  const removeItem = (id) => {
    setBasket((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx === -1) {
        return prev;
      }
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };
  const clearBasket = () => {
    setBasket([]);
  };

  const nutritionSummary = useNutritionCalc(basket);

  const value = useMemo(
    () => ({
      selectedGroup,
      setSelectedGroup,
      basket,
      addItem,
      removeItem,
      clearBasket,
      nutritionSummary,
    }),
    [selectedGroup, basket, nutritionSummary]
  );

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}

export function useMealContext() {
  const ctx = useContext(MealContext);
  if (!ctx) {
    throw new Error("useMealContext must be used within a <MealProvider>");
  }
  return ctx;
}
