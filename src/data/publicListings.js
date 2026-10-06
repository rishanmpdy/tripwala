import p1 from "../assets/images/places/1.webp";
import p2 from "../assets/images/places/2.jpg";
import r1 from "../assets/images/resort_img/resort1.jpg";
import r2 from "../assets/images/resort_img/resort2.jpg";
import f1 from "../assets/images/foodSpot/food1.jpg";
import f2 from "../assets/images/foodSpot/food2.jpg";
import t1 from "../assets/images/place-1.jpg";
import { placeStore, resortStore, foodStore, homestayStore, taxiStore } from "./stores";

const active = (items) => items.filter((item) => item.status === "Active");

const toLocation = (item) => item.location || [item.area, item.district].filter(Boolean).join(", ") || item.address || "Kerala";

const getValidImage = (item, category) => {
  const img = item.image || item.thumbnail || item.gallery?.[0];
  if (img && !img.startsWith("/images/")) return img;
  const numId = String(item.id).replace(/\D/g, '') || "1";
  const num = parseInt(numId, 10);
  if (category === "food-spot") return num % 2 === 0 ? f2 : f1;
  if (category === "resort" || category === "homestay") return num % 2 === 0 ? r2 : r1;
  if (category === "taxi") return t1;
  return num % 2 === 0 ? p2 : p1;
};

export const getPublicFoodSpots = () => active(foodStore.get()).map((item) => ({ ...item, title: item.name, shopName: item.category, media: getValidImage(item, "food-spot"), location: toLocation(item), likes: item.likes || "0", comments: item.comments || "0", rating: item.rating || "4.8" }));
export const getPublicResorts = () => active(resortStore.get()).map((item) => ({ ...item, image: getValidImage(item, "resort"), location: toLocation(item), badge: item.featured ? "Featured" : item.type, likes: item.likes || "0", comments: item.comments || "0", createdAt: item.createdAt || "2026-01-01" }));
export const getPublicHomestays = () => active(homestayStore.get()).map((item) => ({ ...item, image: getValidImage(item, "homestay"), location: toLocation(item), badge: item.featured ? "Featured" : item.type, likes: item.likes || "0", comments: item.comments || "0", createdAt: item.createdAt || "2026-01-01" }));

const toDestination = (item, category, idPrefix = "") => ({ ...item, id: `${idPrefix}${item.id}`, category, spotName: item.name || item.title, location: toLocation(item), image: getValidImage(item, "places"), likes: item.likes || "0", comments: item.comments || "0", rating: item.rating || "4.8" });
export const getPublicDestinations = () => active(placeStore.get()).map((item) => toDestination(item, "places", "place-"));

export const getPublicTaxis = () => active(taxiStore.get()).map((taxi) => ({ ...taxi, image: getValidImage(taxi, "taxi"), price: `₹${taxi.pricePerKm}/km`, service: "Call" }));

export const publicFoodSpots = getPublicFoodSpots();
export const publicResorts = getPublicResorts();
export const publicHomestays = getPublicHomestays();
export const publicDestinations = getPublicDestinations();
