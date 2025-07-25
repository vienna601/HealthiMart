//import meta data, nutrients in grams
import foodMetadata from "./meta-data.json";

//create food items array used in other files
//name is the str key, meta is the object of food properties
export const items = Object.entries(foodMetadata).map(([name, meta], i) => ({
  id: i + 1,
  name,
  group: meta.group,
  calories: meta.calories,
  nutrients: meta.nutrients,
  funFact: meta.funFact,
  imageUrl: `../assets/images/${name.toLowerCase()}.png`,
}));

//helper function for sorting by group
//returns new array with elements that match group passed
// - .filter() uses a callback fn as an argument, the boolean
//   return val of the fn determines whether the element is copied
export function getItemsByGroup(group) {
  return items.filter((item) => item.group === group);
}
