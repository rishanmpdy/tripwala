import places from "./places";

const storageKey = "tripwala-places";
const read = () => { try { const saved = JSON.parse(localStorage.getItem(storageKey)); return Array.isArray(saved) ? saved : places; } catch { return places; } };
export const getPlaces = () => read();
export const savePlaces = (next) => { localStorage.setItem(storageKey, JSON.stringify(next)); window.dispatchEvent(new Event("tripwala-places-updated")); };
export const makePlaceId = () => `place-${Date.now()}`;
