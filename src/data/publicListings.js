import fallbackImage from "../assets/images/place-1.jpg";
import places from "./admin/Places/places";
import hiddenSpots from "./admin/Places/hiddenSpots";
import mustWatch from "./admin/Places/mustWatch";
import foodSpots from "./admin/Places/foodSpots";
import homestays from "./admin/Places/homestays";
import resorts from "./admin/Places/resorts";

const active = (items) => items.filter((item) => item.status === "Active");

const toLocation = (item) => item.location || [item.area, item.district].filter(Boolean).join(", ") || item.address || "Kerala";
const toImage = (item) => item.image || item.thumbnail || item.gallery?.[0] || fallbackImage;

export const publicFoodSpots = active(foodSpots).map((item) => ({ ...item, title: item.name, shopName: item.category, media: toImage(item), location: toLocation(item), likes: item.likes || "0", comments: item.comments || "0", rating: item.rating || "4.8" }));
export const publicResorts = active(resorts).map((item) => ({ ...item, image: toImage(item), location: toLocation(item), badge: item.featured ? "Featured" : item.type, likes: item.likes || "0", comments: item.comments || "0", createdAt: item.createdAt || "2026-01-01" }));
export const publicHomestays = active(homestays).map((item) => ({ ...item, image: toImage(item), location: toLocation(item), badge: item.featured ? "Featured" : item.type, likes: item.likes || "0", comments: item.comments || "0", createdAt: item.createdAt || "2026-01-01" }));

const toDestination = (item, category, idPrefix = "") => ({ ...item, id: `${idPrefix}${item.id}`, category, spotName: item.name || item.title, location: toLocation(item), image: toImage(item), likes: item.likes || "0", comments: item.comments || "0", rating: item.rating || "4.8" });
export const publicDestinations = [
  ...active(places).map((item) => toDestination(item, "places", "place-")),
  ...active(hiddenSpots).map((item) => toDestination(item, "hidden-spot", "hidden-")),
  ...active(mustWatch).map((item) => toDestination({ ...item, name: item.title, location: "Travel video" }, "must-watch", "watch-")),
];

