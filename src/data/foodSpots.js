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
    media: createFoodArt("Wayanad Special Biriyani", "Kalpetta, Wayanad", "#f59e0b"),
    title: "Wayanad Special Biriyani",
    location: "Kalpetta, Wayanad",
    likes: "1.2k",
    comments: "325",
    category: "Food Spot",
  },

  {
    id: "food-2",
    type: "image",
    media: createFoodArt("Traditional Wayanad Food", "Meppadi, Wayanad", "#fb7185"),
    title: "Traditional Wayanad Food",
    location: "Meppadi, Wayanad",
    likes: "856",
    comments: "124",
    category: "Food Spot",
  },

  {
    id: "food-3",
    type: "image",
    media: createFoodArt("Malabar Parotta & Beef", "Sulthan Bathery, Wayanad", "#f97316"),
    title: "Malabar Parotta & Beef",
    location: "Sulthan Bathery, Wayanad",
    likes: "2.1k",
    comments: "415",
    category: "Food Spot",
  },

  {
    id: "food-4",
    type: "image",
    media: createFoodArt("Tea & Snacks", "Vythiri, Wayanad", "#a78bfa"),
    title: "Tea & Snacks",
    location: "Vythiri, Wayanad",
    likes: "743",
    comments: "86",
    category: "Food Spot",
  },

  {
    id: "food-5",
    type: "image",
    media: createFoodArt("Kerala Street Food", "Kalpetta, Wayanad", "#22c55e"),
    title: "Kerala Street Food",
    location: "Kalpetta, Wayanad",
    likes: "3.4k",
    comments: "528",
    category: "Food Spot",
  },

  {
    id: "food-6",
    type: "image",
    media: createFoodArt("Wayanad Coffee", "Vythiri, Wayanad", "#38bdf8"),
    title: "Wayanad Coffee",
    location: "Vythiri, Wayanad",
    likes: "1.8k",
    comments: "212",
    category: "Food Spot",
  },

  {
    id: "food-7",
    type: "image",
    media: createFoodArt("Traditional Kerala Meals", "Meppadi, Wayanad", "#facc15"),
    title: "Traditional Kerala Meals",
    location: "Meppadi, Wayanad",
    likes: "1.5k",
    comments: "193",
    category: "Food Spot",
  },

  {
    id: "food-8",
    type: "image",
    media: createFoodArt("Freshly Prepared Food", "Padinjarathara, Wayanad", "#34d399"),
    title: "Freshly Prepared Food",
    location: "Padinjarathara, Wayanad",
    likes: "2.6k",
    comments: "361",
    category: "Food Spot",
  },
];

export default foodSpots;