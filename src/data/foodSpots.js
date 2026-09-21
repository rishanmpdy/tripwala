import food1 from "../assets/images/foodSpot/food1.jpg";
import food2 from "../assets/images/foodSpot/food2.jpg";
import food3 from "../assets/images/foodSpot/food3.jpg";
import food4 from "../assets/images/foodSpot/food4.jpg";
import food5 from "../assets/images/foodSpot/food5.jpg";

const createFoodArt = (title, location, accent) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>

      <rect width="800" height="1000" fill="url(#bg)" />
      <circle cx="650" cy="140" r="120" fill="rgba(255,255,255,0.12)" />
      <circle cx="170" cy="800" r="170" fill="rgba(255,255,255,0.08)" />
      <path d="M0 760 Q200 630 400 760 T800 760 V1000 H0 Z" fill="rgba(0,0,0,0.18)" />

      <text x="50%" y="46%" text-anchor="middle" font-size="46" font-weight="700" fill="white" font-family="Arial, sans-serif">
        ${title}
      </text>

      <text x="50%" y="58%" text-anchor="middle" font-size="24" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif">
        ${location}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const foodSpots = [
  {
    id: "food-1",
    type: "image",
    media: food1,
    shopName: "Wayanad Spice Hub",
    title: "Wayanad Special Biriyani",
    location: "Kalpetta, Wayanad",
    likes: "1.2k",
    comments: "325",
    rating: "4.8",
    category: "Food Spot",
    cardSize: "portrait",
  },

  {
    id: "food-2",
    type: "image",
    media: food2,
    shopName: "Green Valley Kitchen",
    title: "Traditional Wayanad Food",
    location: "Meppadi, Wayanad",
    likes: "856",
    comments: "124",
    rating: "4.7",
    category: "Food Spot",
    cardSize: "tall",
  },

  {
    id: "food-3",
    type: "image",
    media: food3,
    shopName: "Malabar Roast House",
    title: "Malabar Parotta & Beef",
    location: "Sulthan Bathery, Wayanad",
    likes: "2.1k",
    comments: "415",
    rating: "4.9",
    category: "Food Spot",
    cardSize: "compact",
  },

  {
    id: "food-4",
    type: "image",
    media: food4,
    shopName: "Hilltop Tea Corner",
    title: "Tea & Snacks",
    location: "Vythiri, Wayanad",
    likes: "743",
    comments: "86",
    rating: "4.6",
    category: "Food Spot",
    cardSize: "standard",
  },

  {
    id: "food-5",
    type: "image",
    media: food5,
    shopName: "Street Bites Kerala",
    title: "Kerala Street Food",
    location: "Kalpetta, Wayanad",
    likes: "3.4k",
    comments: "528",
    rating: "4.9",
    category: "Food Spot",
    cardSize: "portrait",
  },

  {
    id: "food-6",
    type: "image",
    media: food1,
    shopName: "Café Mist",
    title: "Wayanad Coffee",
    location: "Vythiri, Wayanad",
    likes: "1.8k",
    comments: "212",
    rating: "4.7",
    category: "Food Spot",
    cardSize: "compact",
  },

  {
    id: "food-7",
    type: "image",
    media: food2,
    shopName: "Keralam Meals House",
    title: "Traditional Kerala Meals",
    location: "Meppadi, Wayanad",
    likes: "1.5k",
    comments: "193",
    rating: "4.8",
    category: "Food Spot",
    cardSize: "tall",
  },

  {
    id: "food-8",
    type: "image",
    media: food3,
    shopName: "Fresh Table Wayanad",
    title: "Freshly Prepared Food",
    location: "Padinjarathara, Wayanad",
    likes: "2.6k",
    comments: "361",
    rating: "4.9",
    category: "Food Spot",
    cardSize: "standard",
  },
];

export default foodSpots;