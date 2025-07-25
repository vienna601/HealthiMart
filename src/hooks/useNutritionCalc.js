//for recipt screen
import { useMemo } from "react";

//general daily targets (RDI) in kcal, g
//add micros later
const RDI = {
  calories: 2000,
  carbs: 300,
  protein: 50,
  fat: 70,
};

export function useNutritionCalc(basket) {
  return useMemo(() => {
    // initialize accumulators
    let totalCalories = 0;
    const macros = { carbs: 0, protein: 0, fat: 0 };

    // sum up
    for (const item of basket) {
      totalCalories += item.calories;
      macros.carbs += item.nutrients.carbs;
      macros.protein += item.nutrients.protein;
      macros.fat += item.nutrients.fat;
    }

    //compute ratios vs. RDI
    const macroRatios = {
      carbs: macros.carbs / RDI.carbs,
      protein: macros.protein / RDI.protein,
      fat: macros.fat / RDI.fat,
    };

    //compute deficits
    const macrosRemaining = {
      carbs: Math.max(0, RDI.carbs - macros.carbs),
      protein: Math.max(0, RDI.protein - macros.protein),
      fat: Math.max(0, RDI.fat - macros.fat),
    };

    return {
      totalCalories,
      macros,
      macroRatios,
      macrosRemaining,
    };
  }, [basket]);
}
