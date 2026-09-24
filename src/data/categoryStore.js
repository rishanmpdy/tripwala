import { categories as defaultCategories } from "./categoryData";

const storageKey = "tripwala-categories";

const safeRead = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Array.isArray(saved) ? saved : defaultCategories;
  } catch {
    return defaultCategories;
  }
};

export const getCategories = () => safeRead();

export const saveCategories = (categories) => {
  localStorage.setItem(storageKey, JSON.stringify(categories));
  window.dispatchEvent(new Event("tripwala-categories-updated"));
};

export const makeCategoryId = (label) => {
  const base = label.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return base || `category-${Date.now()}`;
};
