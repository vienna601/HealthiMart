import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useNutritionCalc } from "../hooks/useNutritionCalc.js";
import { loadBasket, saveBasket } from "../utils/storage.js";

//context does not need to be passed through props, and can instead
//be accessed globally with useMealContext
const MealContext = createContext();

//children is a special prop that represents whatever jsx is nested
//inside that component
export function MealProvider({ children }) {
  //for updating current grp in food rack and array of objects in basket
  const [selectedGroup, setSelectedGroup] = useState();
  //get items from local storage
  const [basket, setBasket] = useState(() => loadBasket());
  //use basket dependency, save changes made to basket
  useEffect(() => {
    saveBasket(basket);
  }, [basket]);

  //actions
  //add new item to basket state with spread
  const addItem = (item) => {
    setBasket((curr) => [...curr, item]);
  };
  //remove an item by id
  const removeItem = (id) => {
    setBasket((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      //id not found
      if (idx === -1) {
        return prev;
      }
      //use spread to return array without the item with specified id
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };
  //clear entire basket
  const clearBasket = () => {
    setBasket([]);
  };

  //get the total with custom hook
  const nutritionSummary = useNutritionCalc(basket);

  //memoize the provider values to avoid unnecessary re‑renders
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
    // if any dependencies change, re‑render
    [selectedGroup, basket, nutritionSummary]
  );

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
}

//custom hook so that useContext(MealContext) doesn't have
//to be imported everywhere
export function useMealContext() {
  const ctx = useContext(MealContext);
  if (!ctx) {
    throw new Error("useMealContext must be used within a <MealProvider>");
  }
  return ctx;
}
