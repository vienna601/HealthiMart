//functions for keeping user's selections even if they refresh the page
//save basket array to local storage as json

//- local storage is a built in browser API (in glocal window object)
//  that lets you save key-value pairs persistently
export function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}
//load the basket from local storage
export function loadBasket() {
  return JSON.parse(localStorage.getItem("basket") || "[]");
}
//generic helper that splits an array into chunks of given size
//used for breaking filtered list of food items into rows for food rack
export function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size)
    chunks.push(arr.slice(i, i + size));
  return chunks;
}
