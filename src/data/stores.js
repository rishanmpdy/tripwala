// src/data/stores.js
import places from "./admin/categories/places";
import resorts from "./admin/categories/resorts";
import foodSpots from "./admin/categories/foodSpots";
import homestays from "./admin/categories/homestays";
import taxis from "./admin/categories/taxiData";

const createStore = (key, initial) => {
  return {
    get: () => {
      try {
        const saved = localStorage.getItem(key);
        if (saved) return JSON.parse(saved);
      } catch (e) {}
      return initial;
    },
    save: (data) => {
      localStorage.setItem(key, JSON.stringify(data));
      window.dispatchEvent(new Event(`${key}-updated`));
    }
  };
};

export const placeStore = createStore("tripwala-places", places);
export const resortStore = createStore("tripwala-resorts", resorts);
export const foodStore = createStore("tripwala-food", foodSpots);
export const homestayStore = createStore("tripwala-homestays", homestays);
export const taxiStore = createStore("tripwala-taxis", taxis);

