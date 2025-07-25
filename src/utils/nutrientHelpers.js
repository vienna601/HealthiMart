// format grams to “xx g”
// compare to daily targets, color‑code if high/low later
export function formatGrams(n) {
  return `${n.toFixed(1)} g`;
}

//format into an array for UI
export function formatNutrients(nutrients) {
  return Object.entries(nutrients).map(([key, grams]) => {
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    return {
      label,
      value: `${grams.toFixed(1)} g`,
    };
  });
}

//function for comparing to reference daily intake
//returns percentage of goal for highlighting in red or green
export function compareToRDI({ carbs, protein, fat }) {
  // assume RDI: 300 g carbs, 50 g protein, 70 g fat
  // - usually a percentage of cals but we don't ask for
  //   user's personal info so it's in grams instead.
  return {
    carbs: carbs / 300,
    protein: protein / 50,
    fat: fat / 70,
  };
}
