import place1 from "../assets/images/places/1.webp";
import place2 from "../assets/images/places/2.jpg";
import place3 from "../assets/images/places/3.jpg";
import place4 from "../assets/images/places/4.jpg";
import place5 from "../assets/images/places/5.jpg";
import place6 from "../assets/images/places/6.jpg";
import place7 from "../assets/images/places/7.jpg";
import placeMain from "../assets/images/place-1.jpg";

export const places = [
  {
    id: 1,
    name: "Chembra Peak",
    category: "Must Visit",
    location: "Meppadi, Wayanad, Kerala",
    image: place1,
    images: [place1, place2, place3, place4, place5],
    description:
      "Chembra Peak is one of the highest peaks in the Western Ghats and the tallest in Wayanad at 2,100 meters above sea level. Famed worldwide for its natural heart-shaped lake ('Hridaya Saras'), it offers breathtaking vistas of lush misty valleys, verdant tea plantations, and cloud-draped peaks.",
    overview:
      "Trekking up Chembra Peak is an unforgettable experience. The trek starts amidst sprawling tea plantations and ascends through dense shola forests, ending near the iconic heart-shaped lake that is believed to never dry up.",
    rating: 4.8,
    reviews: 245,
    bestTime: "October – May",
    entryFee: "₹50 onwards (Trek pass ₹750/group)",
    openingTime: "07:00 AM – 05:00 PM",
    duration: "4–6 Hours",
    type: "Mountain Trek",
    difficulty: "Moderate",
    latitude: 11.453,
    longitude: 76.086,
    mapUrl: "https://maps.google.com/?q=11.453,76.086",
  },
  {
    id: 2,
    name: "Soochipara Waterfalls",
    category: "Waterfall",
    location: "Vellarimala, Meppadi, Wayanad",
    image: place2,
    images: [place2, place3, place4, place6, place7],
    description:
      "Also known as Sentinel Rock Waterfalls, Soochipara is a three-tiered waterfall cascading down from a height of 200 meters. Surrounded by deciduous, evergreen and montane forests, the crystal-clear pool at the foot provides a refreshing swimming experience.",
    overview:
      "A scenic 20-minute downhill walk through rubber and tea plantations brings you to this magnificent waterfall. The roar of the water and the cool mist in the air create a thrilling nature getaway.",
    rating: 4.7,
    reviews: 312,
    bestTime: "June – January",
    entryFee: "₹80 per person",
    openingTime: "08:00 AM – 04:00 PM",
    duration: "2–3 Hours",
    type: "Waterfalls & Forest",
    difficulty: "Easy to Moderate",
    latitude: 11.512,
    longitude: 76.162,
    mapUrl: "https://maps.google.com/?q=11.512,76.162",
  },
  {
    id: 3,
    name: "Edakkal Caves",
    category: "Historical",
    location: "Nenmeni, Ambalavayal, Wayanad",
    image: place3,
    images: [place3, place5, place1, place7],
    description:
      "Edakkal Caves are two natural caves on Ambukuthi Mala, renowned for Neolithic petroglyphs and Stone Age pictorial drawings dating back to 6,000 BCE. It is the only known site in South India with Stone Age engravings.",
    overview:
      "Reaching the caves involves an invigorating 1-km trek uphill from the parking area. Inside the cleft, ancient carvings of human and animal figures, ancient scripts, and symbols fascinate history lovers and adventurers alike.",
    rating: 4.6,
    reviews: 420,
    bestTime: "September – March",
    entryFee: "₹50 (Adults), ₹20 (Kids)",
    openingTime: "09:00 AM – 04:30 PM",
    duration: "2–3 Hours",
    type: "Archaeological & Trek",
    difficulty: "Moderate",
    latitude: 11.628,
    longitude: 76.235,
    mapUrl: "https://maps.google.com/?q=11.628,76.235",
  },
  {
    id: 4,
    name: "Banasura Sagar Dam",
    category: "Nature Wonder",
    location: "Padinjarathara, Wayanad, Kerala",
    image: placeMain,
    images: [placeMain, place4, place5, place6],
    description:
      "Banasura Sagar Dam is the largest earthen dam in India and the second largest in Asia. Set against the majestic Banasura Hills, the dam impounds the Karamanathodu tributary of the Kabini River, forming stunning misty islands in the reservoir.",
    overview:
      "Visitors enjoy speedboating, pedal boating, coracle rides, and scenic nature walks along the reservoir rim with panoramic vistas of island clusters backed by rolling mountain ranges.",
    rating: 4.7,
    reviews: 380,
    bestTime: "September – April",
    entryFee: "₹40 per person",
    openingTime: "08:30 AM – 05:30 PM",
    duration: "2–3 Hours",
    type: "Reservoir & Boating",
    difficulty: "Easy",
    latitude: 11.668,
    longitude: 75.956,
    mapUrl: "https://maps.google.com/?q=11.668,75.956",
  },
  {
    id: 5,
    name: "Kuruva Island",
    category: "Nature",
    location: "Mananthavady, Wayanad, Kerala",
    image: place4,
    images: [place4, place6, place7, place2],
    description:
      "Kuruvadweep is a protected 950-acre river delta on the Kabini River consisting of dense uninhabited evergreen islands home to rare birds, exotic flora, and peaceful bamboo rafting trails.",
    overview:
      "Accessible by traditional bamboo rafts operated by the Kerala Tourism Department, Kuruva Island offers serene walking paths along gushing forest streams and thick bamboo groves.",
    rating: 4.5,
    reviews: 290,
    bestTime: "October – May",
    entryFee: "₹110 per person",
    openingTime: "09:30 AM – 03:30 PM",
    duration: "3–4 Hours",
    type: "River Islands & Rafting",
    difficulty: "Easy",
    latitude: 11.821,
    longitude: 76.094,
    mapUrl: "https://maps.google.com/?q=11.821,76.094",
  },
  {
    id: 6,
    name: "Pookode Lake",
    category: "Must Visit",
    location: "Vythiri, Wayanad, Kerala",
    image: place5,
    images: [place5, place1, place3, place7],
    description:
      "A scenic freshwater lake nestled amidst dense evergreen forests and rolling green hills at an altitude of 770 meters, resembling the shape of India's map from an aerial view.",
    overview:
      "Famous for its blooming blue water lilies, pedal boat facilities, aquarium, and circumscribing paved walkway through wooded hills.",
    rating: 4.6,
    reviews: 360,
    bestTime: "All Year",
    entryFee: "₹30 per person",
    openingTime: "09:00 AM – 05:00 PM",
    duration: "1–2 Hours",
    type: "Freshwater Lake",
    difficulty: "Easy",
    latitude: 11.542,
    longitude: 76.026,
    mapUrl: "https://maps.google.com/?q=11.542,76.026",
  },
];

export default places;
