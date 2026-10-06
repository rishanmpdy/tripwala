// src/data/stores.js
import places from "./admin/categories/places";
import resorts from "./admin/categories/resorts";
import foodSpots from "./admin/categories/foodSpots";
import homestays from "./admin/categories/homestays";
import taxis from "./admin/categories/taxiData";

export const defaultContactNumbers = [
  {
    id: "contact-1",
    name: "Main Booking Desk (Agent)",
    phone: "+91 94471 88990",
    whatsapp: "+91 94471 88990",
    category: "All",
    isDefaultResorts: true,
    isDefaultHomestays: true,
    status: "Active",
    note: "Primary Tripwala agency booking desk WhatsApp",
    assignedResorts: [1, 2],
    assignedHomestays: [1],
  },
  {
    id: "contact-2",
    name: "Wayanad Luxury Desk",
    phone: "+91 98470 55660",
    whatsapp: "+91 98470 55660",
    category: "Resorts",
    isDefaultResorts: false,
    isDefaultHomestays: false,
    status: "Active",
    note: "Dedicated resort coordination line for Wayanad stays",
    assignedResorts: [3, 4],
    assignedHomestays: [],
  },
  {
    id: "contact-3",
    name: "Homestay Host Relations",
    phone: "+91 91234 56780",
    whatsapp: "+91 91234 56780",
    category: "Homestays",
    isDefaultResorts: false,
    isDefaultHomestays: false,
    status: "Active",
    note: "Homestay customer enquiry and host liaison team",
    assignedResorts: [],
    assignedHomestays: [2],
  },
  {
    id: "contact-4",
    name: "Eco & Forest Stays Desk",
    phone: "+91 94000 11223",
    whatsapp: "+91 94000 11223",
    category: "Resorts",
    isDefaultResorts: false,
    isDefaultHomestays: false,
    status: "Active",
    note: "Forest escapes & treehouse stays enquiry line",
    assignedResorts: [5, 6],
    assignedHomestays: [],
  },
  {
    id: "contact-5",
    name: "VIP Guest Support Desk",
    phone: "+91 98950 44332",
    whatsapp: "+91 98950 44332",
    category: "All",
    isDefaultResorts: false,
    isDefaultHomestays: false,
    status: "Active",
    note: "High priority enquiries and concierge desk",
    assignedResorts: [],
    assignedHomestays: [],
  },
];

const createStore = (key, initial) => {
  // In-memory cache: localStorage is parsed once, not on every render.
  let cache = null;

  const get = () => {
    if (cache) return cache;
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      // Corrupted / wrong-shaped data falls back to defaults instead of crashing pages.
      cache = Array.isArray(saved) ? saved : initial;
    } catch {
      cache = initial;
    }
    return cache;
  };

  // Returns true on success, false if storage is full/blocked (e.g. large images).
  const save = (data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      alert("Could not save: browser storage is full. Try fewer or smaller images.");
      return false;
    }
    cache = data;
    window.dispatchEvent(new Event(`${key}-updated`));
    window.dispatchEvent(new Event("tripwala-store-updated"));
    return true;
  };

  // Keep cache in sync when another tab edits the same data.
  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key === key || e.key === null) cache = null;
    });
  }

  return {
    get,
    getAll: get,
    getById: (id) => get().find((item) => String(item.id) === String(id)),
    save,
    create: (item) => {
      const all = get();
      const newItem = {
        ...item,
        id: item.id || `item-${Date.now()}`,
        createdAt: item.createdAt || new Date().toISOString().split("T")[0]
      };
      save([newItem, ...all]);
      return newItem;
    },
    update: (id, updates) => {
      const all = get();
      const updated = all.map((item) =>
        String(item.id) === String(id) ? { ...item, ...updates } : item
      );
      save(updated);
      return updated;
    },
    remove: (id) => {
      const all = get();
      const filtered = all.filter((item) => String(item.id) !== String(id));
      save(filtered);
      return filtered;
    }
  };
};

export const defaultReviews = [
  {
    id: "rev-1",
    author: "Arjun Nair",
    email: "arjun.nair@gmail.com",
    propertyName: "Wayanad Lake View Resort",
    propertyCategory: "Resort",
    propertyId: 1,
    rating: 5,
    date: "2026-03-28",
    comment: "Spectacular property right next to the water! The morning views with mist drifting across the lake are pure magic. The food was delicious and staff took great care of our family.",
    status: "Unread",
  },
  {
    id: "rev-2",
    author: "Pooja & Rohan",
    email: "rohan.sharma@yahoo.com",
    propertyName: "Mountain View Resort",
    propertyCategory: "Resort",
    propertyId: 2,
    rating: 5,
    date: "2026-03-24",
    comment: "Booked the Jacuzzi Suite for our anniversary. The candlelight dinner set up beside the infinity pool was top notch. Highly recommended!",
    status: "Read",
  },
  {
    id: "rev-3",
    author: "Meera Krishnan",
    email: "meera.k@outlook.com",
    propertyName: "Green Valley Homestay",
    propertyCategory: "Homestay",
    propertyId: 1,
    rating: 4,
    date: "2026-03-20",
    comment: "Very cozy and authentic Kerala home experience. The host cooked amazing homemade appam and stew for breakfast. Would visit again.",
    status: "Unread",
  },
  {
    id: "rev-4",
    author: "CryptoSpam Bot",
    email: "fastprofit99@spammail.com",
    propertyName: "Forest Escape Resort",
    propertyCategory: "Resort",
    propertyId: 3,
    rating: 1,
    date: "2026-03-18",
    comment: "CLICK HERE FOR FREE BONUS http://fake-crypto-giveaway.spam NOT A REAL REVIEW",
    status: "Blocked",
  },
  {
    id: "rev-5",
    author: "Kiran Dev",
    email: "kirandev.wayanad@gmail.com",
    propertyName: "Mist Valley House",
    propertyCategory: "Homestay",
    propertyId: 2,
    rating: 5,
    date: "2026-03-15",
    comment: "Private and peaceful stay nestled in tea plantations. Fast Wi-Fi was a big plus since I had to work remotely.",
    status: "Read",
  },
  {
    id: "rev-6",
    author: "David Miller",
    email: "david.miller@traveler.org",
    propertyName: "Chembra Peak",
    propertyCategory: "Place",
    propertyId: 1,
    rating: 5,
    date: "2026-03-10",
    comment: "The heart-shaped lake trek was breathtaking! Make sure to take trekking passes early in the morning.",
    status: "Read",
  },
  {
    id: "rev-7",
    author: "Harish Varma",
    email: "harish.varma@gmail.com",
    propertyName: "1980's A Nostalgic Restaurant",
    propertyCategory: "Food Spot",
    propertyId: 1,
    rating: 4,
    date: "2026-03-05",
    comment: "Traditional Kerala meals served on banana leaf. Authentic taste and very nostalgic ambiance.",
    status: "Unread",
  },
  {
    id: "rev-8",
    author: "Promotional Bot",
    email: "seo-links-boost@promo.xyz",
    propertyName: "Banasura Sagar Dam",
    propertyCategory: "Place",
    propertyId: 2,
    rating: 1,
    date: "2026-03-01",
    comment: "Best cheap flight deals available on our website visit now fake promo link",
    status: "Blocked",
  },
];

export const defaultAdminUsers = [
  {
    id: "usr-1",
    name: "Master Superadmin",
    email: "superadmin@tripwala.demo",
    password: "TripWala@123",
    role: "superadmin", // "superadmin" | "admin" | "user"
    status: "Active",
    createdAt: "2026-01-15",
    lastLogin: "Just now",
  },
  {
    id: "usr-2",
    name: "Operations Admin",
    email: "admin@tripwala.demo",
    password: "TripWala@123",
    role: "admin",
    status: "Active",
    createdAt: "2026-02-01",
    lastLogin: "2 hours ago",
  },
  {
    id: "usr-3",
    name: "Regional Admin",
    email: "admin@tripwala.com",
    password: "TripWala@123",
    role: "admin",
    status: "Active",
    createdAt: "2026-02-14",
    lastLogin: "Yesterday",
  },
  {
    id: "usr-4",
    name: "Support Staff User",
    email: "user@tripwala.com",
    password: "TripWala@123",
    role: "user",
    status: "Active",
    createdAt: "2026-03-01",
    lastLogin: "3 days ago",
  },
  {
    id: "usr-5",
    name: "Desk Coordinator",
    email: "desk@tripwala.com",
    password: "TripWala@123",
    role: "user",
    status: "Active",
    createdAt: "2026-03-12",
    lastLogin: "1 week ago",
  },
];

export const placeStore = createStore("tripwala-places", places);
export const resortStore = createStore("tripwala-resorts", resorts);
export const foodStore = createStore("tripwala-food", foodSpots);
export const homestayStore = createStore("tripwala-homestays", homestays);
export const taxiStore = createStore("tripwala-taxis", taxis);
export const contactNumberStore = createStore("tripwala-contact-numbers", defaultContactNumbers);
export const reviewStore = createStore("tripwala-reviews", defaultReviews);
export const userStore = createStore("tripwala-admin-users", defaultAdminUsers);


