//for recipt screen
import { useMemo } from "react";
import { compareToMacros, compareToMicros } from "../utils/nutrientHelpers";

//general daily targets (RDI) in kcal, g,
//mg(for cholesterol, sodium, and potassium)
const RDI = {
  calories: 2000,
  carbs: 300,
  protein: 50,
  fat: 70,
  cholesterol: 300,
  sodium: 2300,
  potassium: 4700,
  fiber: 28,
  sugar: 30,
};

export function useNutritionCalc(basket) {
  return useMemo(() => {
    // initialize accumulators
    let totalCalories = 0;
    const macros = { carbs: 0, protein: 0, fat: 0 };
    const micros = {
      cholesterol: 0,
      sodium: 0,
      potassium: 0,
      fiber: 0,
      sugar: 0,
    };

    // sum up nutrient values of all items
    for (const item of basket) {
      totalCalories += item.calories;
      macros.carbs += item.macros.carbs;
      macros.protein += item.macros.protein;
      macros.fat += item.macros.fat;
      micros.cholesterol += item.micros.cholesterol;
      micros.sodium += item.micros.sodium;
      micros.potassium += item.micros.potassium;
      micros.fiber += item.micros.fiber;
      micros.sugar += item.micros.sugar;
    }

    //compute ratios vs. RDI
    const macroRatios = compareToMacros(macros);
    const microRatios = compareToMicros(micros);

    //compute deficits/excess amounts
    const nutrientDiff = {
      carbs: Math.abs(RDI.carbs - macros.carbs),
      protein: Math.abs(RDI.protein - macros.protein),
      fat: Math.abs(RDI.fat - macros.fat),
      cholesterol: Math.abs(RDI.cholesterol - micros.cholesterol),
      sodium: Math.abs(RDI.sodium - micros.sodium),
      potassium: Math.abs(RDI.potassium - micros.potassium),
      fiber: Math.abs(RDI.fiber - micros.fiber),
      sugar: Math.abs(RDI.sugar - micros.sugar),
    };

    return {
      totalCalories,
      macros,
      micros,
      macroRatios,
      microRatios,
      nutrientDiff,
    };
  }, [basket]);
}
