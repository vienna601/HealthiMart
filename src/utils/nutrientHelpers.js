// format grams/milligrams
export function formatGrams(nutrient, n) {
  const mgNutrients = ["Cholesterol", "Sodium", "Potassium"];
  if (mgNutrients.includes(nutrient)) {
    return `${n.toFixed(1)} mg`;
  }
  return `${n.toFixed(1)} g`;
}

//function for comparing to recommended daily intake
//please see our README for references
export function compareToMacros({ carbs, protein, fat }) {
  // assume RDI for macros: 300 g carbs, 50 g protein, 70 g fat
  // - usually a percentage of cals but we don't ask for
  //   user's personal info so it's in grams instead.
  return {
    carbs: carbs / 300,
    protein: protein / 50,
    fat: fat / 70,
  };
}
//please see our README for references
export function compareToMicros({
  cholesterol,
  sodium,
  potassium,
  fiber,
  sugar,
}) {
  return {
    cholesterol: cholesterol / 300,
    sodium: sodium / 2300,
    potassium: potassium / 4700,
    fiber: fiber / 28,
    sugar: sugar / 30,
  };
}
