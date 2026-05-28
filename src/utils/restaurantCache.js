const KEY = "restaurantCache";

export function saveRestaurantCache(restaurant) {
  if (!restaurant?.name) return;
  const cache = getRestaurantCache();
  cache[restaurant.name] = restaurant;
  localStorage.setItem(KEY, JSON.stringify(cache));
}

export function getRestaurantCache() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}
