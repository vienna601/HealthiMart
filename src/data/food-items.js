import foodMetadata from "./meta-data.json";

export const items = Object.entries(foodMetadata).map(([name, meta], i) => ({
  id: i + 1,
  name,
  group: meta.group,
  calories: meta.calories,
  macros: meta.macros,
  micros: meta.micros,
  funFact: meta.funFact,
  imageUrl: `/assets/images/${name.toLowerCase().replace(/\s+/g, "-")}.png`,
}));

export function getItemsByGroup(group) {
  return items.filter((item) => item.group === group);
}
