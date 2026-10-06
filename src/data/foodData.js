import food1 from "../assets/images/foodSpot/food1.jpg";
import food2 from "../assets/images/foodSpot/food2.jpg";
import food3 from "../assets/images/foodSpot/food3.jpg";
import food4 from "../assets/images/foodSpot/food4.jpg";
import food5 from "../assets/images/foodSpot/food5.jpg";
import { foodStore } from "./stores";

export const defaultDishes = [
  {
    name: "Traditional Banana Leaf Sadya",
    price: 180,
    type: "Veg",
    category: "Meals",
    isSpecial: true,
    description: "Grand Kerala meal served on banana leaf with 14 varieties of authentic curries, thoran, avial, sambar, payasam, and red rice.",
    image: food1,
  },
  {
    name: "Malabar Dum Biryani",
    price: 220,
    type: "Non-Veg",
    category: "Biryani & Rice",
    isSpecial: true,
    description: "Fragrant kaima rice cooked on slow dum with tender marinated chicken, golden caramelized onions, cashew nuts, and mint.",
    image: food2,
  },
  {
    name: "Karimeen Pollichathu",
    price: 340,
    type: "Non-Veg",
    category: "Seafood",
    isSpecial: true,
    description: "Fresh pearl spot fish marinated in fiery shallot & tomato masala, wrapped tightly in banana leaf and slow roasted on tawa.",
    image: food3,
  },
  {
    name: "Nool Appam with Mutton Stew",
    price: 240,
    type: "Non-Veg",
    category: "Breads & Curries",
    isSpecial: false,
    description: "Steamed string hoppers (Idiyappam) paired with velvety mild coconut milk mutton stew spiced with whole green cardamom.",
    image: food4,
  },
  {
    name: "Kerala Beef Fry (Ularthiyathu)",
    price: 190,
    type: "Non-Veg",
    category: "Starters & Fries",
    isSpecial: true,
    description: "Tender beef chunks slow-roasted with roasted coconut slivers, curry leaves, crushed black pepper, and fragrant shallots.",
    image: food5,
  },
  {
    name: "Wayanad Estate Filter Coffee",
    price: 60,
    type: "Veg",
    category: "Beverages",
    isSpecial: false,
    description: "Freshly brewed high-altitude Robusta and Arabica blend coffee poured frothy in traditional brass tumbler & davarah.",
    image: food2,
  },
  {
    name: "Malabar Parotta with Chicken Roast",
    price: 170,
    type: "Non-Veg",
    category: "Breads & Curries",
    isSpecial: false,
    description: "Flaky, multi-layered golden Kerala parottas paired with thick, onion-tomato slow-cooked spicy chicken roast.",
    image: food1,
  },
  {
    name: "Payasam of the Day",
    price: 80,
    type: "Veg",
    category: "Desserts",
    isSpecial: false,
    description: "Traditional slow-simmered dessert made with palada or roasted lentils, melted jaggery, thick coconut milk, and roasted cashews.",
    image: food4,
  },
];

export const foodSpots = [
  {
    id: 1,
    name: "1980's A Nostalgic Restaurant",
    category: "Restaurant",
    location: "Meppadi, Wayanad, Kerala",
    address: "Kalpetta-Ooty Road, Meppadi, Wayanad, Kerala 673577",
    image: food1,
    images: [food1, food2, food3, food4, food5],
    description: "A popular food destination offering authentic Kerala dishes in a unique nostalgic atmosphere with traditional artifacts and vintage dining setup.",
    rating: 4.8,
    reviews: 240,
    priceRange: "₹₹",
    cuisine: "Kerala Traditional",
    foodType: "Traditional Meals & Seafood",
    openingHours: "11:00 AM – 10:30 PM",
    bestFor: "Family & Authentic Kerala Dining",
    serviceType: "Dine-in • Takeaway",
    phone: "+91 98765 43210",
    latitude: 11.6100,
    longitude: 76.0800,
    mapUrl: "https://maps.google.com/?q=Meppadi+Wayanad",
    menu: defaultDishes,
  },
  {
    id: 2,
    name: "Wayanad Coffee House",
    category: "Cafe",
    location: "Kalpetta, Wayanad, Kerala",
    address: "Bypass Road, Near District Collectorate, Kalpetta, Wayanad",
    image: food2,
    images: [food2, food3, food4, food1, food5],
    description: "A serene coffee house surrounded by lush greenery, specializing in artisanal estate coffees, handmade pastries, and regional snacks.",
    rating: 4.6,
    reviews: 142,
    priceRange: "₹",
    cuisine: "Cafe & Bakery",
    foodType: "Beverages & Light Bites",
    openingHours: "08:00 AM – 09:30 PM",
    bestFor: "Coffee Lovers & Work from Cafe",
    serviceType: "Dine-in • Takeaway • WiFi",
    phone: "+91 94470 12345",
    latitude: 11.6080,
    longitude: 76.0820,
    mapUrl: "https://maps.google.com/?q=Kalpetta+Wayanad",
    menu: [
      {
        name: "Artisanal Wayanad Robusta Brew",
        price: 80,
        type: "Veg",
        category: "Beverages",
        isSpecial: true,
        description: "Freshly ground locally grown dark roast coffee served with warm jaggery.",
        image: food2,
      },
      {
        name: "Pazham Pori with Beef Roast",
        price: 150,
        type: "Non-Veg",
        category: "Starters & Fries",
        isSpecial: true,
        description: "Crispy sweet golden banana fritters served alongside slow-roasted spicy Malabar beef.",
        image: food3,
      },
      {
        name: "Kerala Filter Coffee",
        price: 60,
        type: "Veg",
        category: "Beverages",
        isSpecial: false,
        description: "Frothy traditional chicory-infused filter coffee poured in brass tumbler.",
        image: food4,
      },
      {
        name: "Elaneer Pudding (Tender Coconut)",
        price: 110,
        type: "Veg",
        category: "Desserts",
        isSpecial: true,
        description: "Refreshing melt-in-mouth pudding made with fresh tender coconut water and coconut pulp.",
        image: food1,
      },
      {
        name: "Steamed Kozhukatta",
        price: 70,
        type: "Veg",
        category: "Snacks",
        isSpecial: false,
        description: "Steamed rice flour dumplings stuffed with grated fresh coconut, cardamom, and jaggery.",
        image: food5,
      },
    ],
  },
  {
    id: 10,
    name: "Wayanad Traditional Kitchen",
    category: "Food Spot",
    location: "Kalpetta, Wayanad, Kerala",
    address: "Main Road, Kalpetta, Wayanad",
    image: food3,
    images: [food3, food1, food2, food4, food5],
    description: "A popular local food spot offering traditional Kerala dishes and authentic Wayanad flavours.",
    rating: 4.7,
    reviews: 186,
    priceRange: "₹₹",
    cuisine: "Kerala",
    foodType: "Traditional",
    openingHours: "11:00 AM – 10:00 PM",
    bestFor: "Family & Local Food",
    serviceType: "Dine-in • Takeaway",
    phone: "+91 98765 43210",
    latitude: 11.608,
    longitude: 76.083,
    mapUrl: "https://maps.google.com/?q=Kalpetta+Wayanad",
    menu: defaultDishes,
  },
];

// Helper to look up by ID from static list or active foodStore
export const getFoodSpotById = (id) => {
  const parsedId = String(id).replace("food-", "");
  const found = foodSpots.find((item) => String(item.id) === parsedId);
  if (found) return found;

  try {
    const stored = foodStore.get();
    const storedMatch = stored.find((item) => String(item.id) === parsedId);
    if (storedMatch) {
      return {
        ...storedMatch,
        images: storedMatch.gallery?.length ? storedMatch.gallery : [storedMatch.image || food1, food2, food3, food4],
        location: storedMatch.location || `${storedMatch.area || "Kalpetta"}, ${storedMatch.district || "Wayanad"}`,
        phone: storedMatch.phone || "+91 98765 43210",
        openingHours: storedMatch.openingHours || "11:00 AM – 10:00 PM",
        foodType: storedMatch.category || "Restaurant",
        mapUrl: storedMatch.mapsUrl || "https://maps.google.com",
        menu: storedMatch.menu?.length ? storedMatch.menu : defaultDishes,
      };
    }
  } catch {
    // fallback
  }

  return foodSpots[0];
};

export default foodSpots;
