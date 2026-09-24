const taxiData = [
  {
    id: 1,
    name: "Wayanad Taxi Service",
    driverName: "Shihab",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",

    vehicleType: "SUV",
    vehicleName: "Toyota Innova Crysta",
    vehicleNumber: "KL 12 AB 1234",

    location: "Kalpetta, Wayanad",
    district: "Wayanad",
    state: "Kerala",

    image: "/images/taxi/taxi-1.jpg",

    pricePerKm: 18,
    pricePerDay: 2500,

    rating: 4.8,
    reviews: 124,

    features: [
      "AC",
      "Driver",
      "Airport Pickup",
      "Outstation",
    ],

    description:
      "Comfortable taxi service available throughout Wayanad and nearby destinations.",

    status: "Active",

    createdAt: "2026-09-20",
  },

  {
    id: 2,
    name: "Green Valley Travels",
    driverName: "Afsal",
    phone: "+91 91234 56789",
    whatsapp: "+91 91234 56789",

    vehicleType: "Sedan",
    vehicleName: "Swift Dzire",
    vehicleNumber: "KL 11 CD 5678",

    location: "Meppadi, Wayanad",
    district: "Wayanad",
    state: "Kerala",

    image: "/images/taxi/taxi-2.jpg",

    pricePerKm: 15,
    pricePerDay: 2200,

    rating: 4.6,
    reviews: 87,

    features: [
      "AC",
      "Driver",
      "Local Trips",
    ],

    description:
      "Affordable taxi service for local sightseeing and short-distance trips.",

    status: "Active",

    createdAt: "2026-09-18",
  },

  {
    id: 3,
    name: "Malabar Cab Service",
    driverName: "Rashid",
    phone: "+91 99887 66554",
    whatsapp: "+91 99887 66554",

    vehicleType: "Premium",
    vehicleName: "Toyota Innova",
    vehicleNumber: "KL 10 EF 9876",

    location: "Sultan Bathery, Wayanad",
    district: "Wayanad",
    state: "Kerala",

    image: "/images/taxi/taxi-3.jpg",

    pricePerKm: 20,
    pricePerDay: 3000,

    rating: 4.9,
    reviews: 156,

    features: [
      "AC",
      "Driver",
      "Airport Pickup",
      "Outstation",
      "Tour Package",
    ],

    description:
      "Premium taxi service for family trips, airport transfers and outstation travel.",

    status: "Inactive",

    createdAt: "2026-09-15",
  },
];

export default taxiData;