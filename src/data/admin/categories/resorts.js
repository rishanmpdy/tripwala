import resort1 from "../../../assets/images/resort_img/resort1.jpg";
import resort2 from "../../../assets/images/resort_img/resort2.jpg";
import resort3 from "../../../assets/images/resort_img/resort3.jpg";
import resort4 from "../../../assets/images/resort_img/resort4.jpg";
import resort5 from "../../../assets/images/resort_img/resort5.jpg";
import resort6 from "../../../assets/images/resort_img/resort6.jpg";

const resorts = [
  {
    id: 1,
    name: "Wayanad Lake View Resort",
    type: "Luxury Resort",
    status: "Active",
    shortDescription: "A peaceful luxury resort surrounded by the mountains.",
    description: "Private pool | viewpoint | Breakfast Games | Children's park ...",
    priceRange: "5000-10000",
    image: resort1,
    gallery: [resort1, resort2, resort3],
    badge: "Popular",
    featured: true,
    location: "Wayanad, Kerala",
    likes: "1.2k",
    comments: "325",
    createdAt: "2026-09-21"
  },
  {
    id: 2,
    name: "Mountain View Resort",
    type: "Nature Resort",
    status: "Active",
    shortDescription: "Experience nature at its best with our exclusive resort.",
    description: "Mountain view | Private room | Breakfast | Parking ...",
    priceRange: "2000-5000",
    image: resort2,
    gallery: [resort2, resort3, resort4],
    badge: "Budget friendly",
    featured: false,
    location: "Vythiri, Wayanad",
    likes: "986",
    comments: "214",
    createdAt: "2026-09-20"
  },
  {
    id: 3,
    name: "Forest Escape Resort",
    type: "Eco Resort",
    status: "Active",
    shortDescription: "Stay inside the forest and enjoy the wilderness.",
    description: "Forest stay | Private pool | Campfire | Family friendly ...",
    priceRange: "10000+",
    image: resort3,
    gallery: [resort3, resort4, resort5],
    badge: "Premium",
    featured: true,
    location: "Meppadi, Wayanad",
    likes: "2.4k",
    comments: "438",
    createdAt: "2026-09-19"
  },
  {
    id: 4,
    name: "Nature View Homestay",
    type: "Family Resort",
    status: "Active",
    shortDescription: "Perfect homestay resort for families.",
    description: "Nature view | Breakfast | Parking | Family stay ...",
    priceRange: "Under 2000",
    image: resort4,
    gallery: [resort4, resort5, resort6],
    badge: "Budget friendly",
    featured: false,
    location: "Kalpetta, Wayanad",
    likes: "754",
    comments: "102",
    createdAt: "2026-09-18"
  },
  {
    id: 5,
    name: "Luxury Hills Resort",
    type: "Luxury Resort",
    status: "Active",
    shortDescription: "Premium luxury resort on the hilltop.",
    description: "Luxury rooms | Infinity pool | Restaurant | Mountain view ...",
    priceRange: "10000+",
    image: resort5,
    gallery: [resort5, resort6, resort1],
    badge: "Luxury",
    featured: true,
    location: "Vythiri, Wayanad",
    likes: "3.1k",
    comments: "562",
    createdAt: "2026-09-17"
  },
  {
    id: 6,
    name: "Green Valley Resort",
    type: "Boutique Resort",
    status: "Active",
    shortDescription: "Cozy boutique resort inside the valley.",
    description: "Valley view | Restaurant | Parking | Couple friendly ...",
    priceRange: "5000-10000",
    image: resort6,
    gallery: [resort6, resort1, resort2],
    badge: "Popular",
    featured: false,
    location: "Sulthan Bathery, Wayanad",
    likes: "1.5k",
    comments: "267",
    createdAt: "2026-09-16"
  }
];

export default resorts;
