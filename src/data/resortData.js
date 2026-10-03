import resort1 from "../assets/images/resort_img/resort1.jpg";
import resort2 from "../assets/images/resort_img/resort2.jpg";
import resort3 from "../assets/images/resort_img/resort3.jpg";
import resort4 from "../assets/images/resort_img/resort4.jpg";
import resort5 from "../assets/images/resort_img/resort5.jpg";
import resort6 from "../assets/images/resort_img/resort6.jpg";

export const resortData = [
  {
    id: 1,
    name: "Wayanad Lake View Resort",
    tagline: "Serene lakeside luxury nestled amidst misty peaks & verdant valleys",
    type: "Luxury Resort",
    status: "Active",
    badge: "Popular",
    featured: true,
    rating: 4.9,
    reviewsCount: 348,
    likes: "1.8k",
    comments: "325",
    pricePerNight: 6500,
    originalPrice: 8500,
    priceRange: "₹5,000 - ₹10,000",
    location: "Padinjarathara, Wayanad, Kerala",
    address: "Banasura Dam Road, Padinjarathara, Vythiri, Wayanad, Kerala - 673575",
    mapUrl: "https://maps.google.com/?q=Wayanad+Lake+View+Resort",
    image: resort1,
    gallery: [resort1, resort2, resort3, resort4, resort5, resort6],
    overview:
      "Perched on the tranquil banks of the Banasura waters, Wayanad Lake View Resort delivers an unforgettable sanctuary in the heart of Kerala's Western Ghats. Crafted with indigenous teak wood and contemporary stone architecture, every villa opens directly to sweeping vistas of shimmering waters and mist-kissed hillsides.\n\nAwaken to the calls of exotic birds, relish authentic Malabar culinary creations prepared from organic estate produce, and rejuvenate your senses at the holistic Ayurvedic spa. Whether you seek a romantic secluded getaway, a memorable family retreat, or an inspiring nature expedition, our curated hospitality ensures every moment feels timeless.",
    highlights: [
      {
        icon: "water",
        title: "Panoramic Lake & Mountain Views",
        desc: "Unobstructed waterfront vistas with private sunrise viewing decks."
      },
      {
        icon: "pool",
        title: "Infinity Edge Pool",
        desc: "Heated infinity pool overlooking the Banasura hills and lake."
      },
      {
        icon: "spa",
        title: "Holistic Ayurvedic Wellness",
        desc: "Certified doctors offering bespoke rejuvenation therapies."
      },
      {
        icon: "restaurant",
        title: "Farm-to-Fork Gourmet Dining",
        desc: "Traditional Kerala thalis, coastal seafood & continental fare."
      },
      {
        icon: "local_fire_department",
        title: "Starlight Bonfire & BBQ",
        desc: "Evening acoustic music, live barbecue grills, and warm campfires."
      },
      {
        icon: "hiking",
        title: "Guided Coffee Plantation Walks",
        desc: "Morning walking trails with naturalist guides and spice tastings."
      }
    ],
    amenities: [
      {
        category: "Popular Amenities",
        items: [
          { name: "Infinity Swimming Pool", icon: "pool" },
          { name: "High-Speed Wi-Fi", icon: "wifi" },
          { name: "Free Valet Parking", icon: "local_parking" },
          { name: "Complimentary Breakfast", icon: "bakery_dining" },
          { name: "Ayurvedic Spa & Steam", icon: "spa" },
          { name: "Multi-Cuisine Restaurant", icon: "restaurant" }
        ]
      },
      {
        category: "Room & Comfort",
        items: [
          { name: "Climate Control AC", icon: "ac_unit" },
          { name: "Private Balcony & Deck", icon: "balcony" },
          { name: "24/7 In-Room Dining", icon: "room_service" },
          { name: "55\" 4K Smart TV", icon: "tv" },
          { name: "Tea & Espresso Maker", icon: "coffee" },
          { name: "Rain Shower & Herbal Bathrobes", icon: "bathtub" }
        ]
      },
      {
        category: "Recreation & Activities",
        items: [
          { name: "Billiards & Board Games", icon: "sports_esports" },
          { name: "Children's Adventure Park", icon: "toys" },
          { name: "Campfire with Live BBQ", icon: "local_fire_department" },
          { name: "Spice Plantation Trekking", icon: "hiking" },
          { name: "Sunset Yoga & Meditation", icon: "self_improvement" }
        ]
      },
      {
        category: "Services & Safety",
        items: [
          { name: "24-Hour Concierge", icon: "support_agent" },
          { name: "Airport & Station Cabs", icon: "local_taxi" },
          { name: "Daily Deep Housekeeping", icon: "cleaning_services" },
          { name: "Doctor on Call", icon: "medical_services" },
          { name: "Round-the-clock CCTV", icon: "security" }
        ]
      }
    ],
    rooms: [
      {
        id: "lake-villa",
        name: "Lakefront Deluxe Villa",
        type: "Private Villa",
        price: 6500,
        originalPrice: 8500,
        size: "480 sq.ft",
        bed: "1 King Bed",
        capacity: "2 Adults + 1 Child",
        features: ["Waterfront Balcony", "King Size Bed", "Rain Shower", "Free Breakfast", "Mini Bar"],
        image: resort1,
        gallery: [resort1, resort4, resort5, resort6]
      },
      {
        id: "mountain-suite",
        name: "Mountain Mist Jacuzzi Suite",
        type: "Luxury Suite",
        price: 9200,
        originalPrice: 12000,
        size: "620 sq.ft",
        bed: "1 King Bed + Daybed",
        capacity: "3 Adults or 2 Adults + 2 Kids",
        features: ["Private Heated Jacuzzi", "Valley Panorama", "Walk-in Closet", "Espresso Bar", "Complimentary High Tea"],
        image: resort2,
        gallery: [resort2, resort3, resort5, resort1]
      },
      {
        id: "family-cottage",
        name: "Two-Bedroom Heritage Cottage",
        type: "Family Cottage",
        price: 13500,
        originalPrice: 16500,
        size: "950 sq.ft",
        bed: "2 King Beds",
        capacity: "4 to 6 Guests",
        features: ["Private Garden", "Living & Dining Area", "Double En-Suite Bathrooms", "Dedicated Butler", "BBQ Facility"],
        image: resort3,
        gallery: [resort3, resort6, resort2, resort4]
      }
    ],
    policies: {
      checkIn: "02:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 48 hours prior to check-in date. 100% refund guaranteed.",
      pets: "Pets permitted in selected private garden cottages upon advance notification.",
      smoking: "Non-smoking inside suites; dedicated outdoor scenic smoking decks available.",
      children: "Children under 6 stay free of charge sharing parents' bedding."
    },
    contact: {
      phone: "+91 98470 12345",
      whatsapp: "+91 98470 12345",
      email: "reservations@wayanadlakeview.com",
      website: "https://wayanadlakeview.com",
      address: "Banasura Dam Road, Padinjarathara, Vythiri, Wayanad, Kerala - 673575"
    },
    reviews: [
      {
        id: "rev-1",
        author: "Arjun Nair",
        location: "Bengaluru",
        rating: 5,
        date: "March 2026",
        avatar: "AN",
        comment: "Spectacular property right next to the water! The morning views with mist drifting across the lake are pure magic. The food was delicious and staff took great care of our family."
      },
      {
        id: "rev-2",
        author: "Pooja & Rohan",
        location: "Mumbai",
        rating: 5,
        date: "February 2026",
        avatar: "PR",
        comment: "Booked the Jacuzzi Suite for our anniversary. The candlelight dinner set up beside the infinity pool was top notch. Highly recommended!"
      },
      {
        id: "rev-3",
        author: "David Miller",
        location: "London, UK",
        rating: 4.8,
        date: "January 2026",
        avatar: "DM",
        comment: "The spice plantation tour and Ayurvedic oil massage were highlights of our Kerala tour. Impeccable cleanliness and peaceful surroundings."
      }
    ],
    faqs: [
      {
        q: "Is complimentary breakfast included in all bookings?",
        a: "Yes! All bookings include our chef's signature buffet breakfast featuring traditional Kerala delicacies, freshly baked bread, fresh fruit juices, and continental choices."
      },
      {
        q: "How far is the resort from Calicut (Kozhikode) Airport?",
        a: "The resort is approximately 78 km from Calicut International Airport (CCJ), around a scenic 2.5-hour drive through the Thamarassery Churam mountain pass."
      },
      {
        q: "Can the resort arrange airport transfers or local sightseeing cabs?",
        a: "Yes, our travel desk arranges private chauffeur-driven vehicles for airport pick-up and customized Wayanad sightseeing tours."
      }
    ]
  },
  {
    id: 2,
    name: "Mountain View Eco Resort",
    tagline: "Breathtaking cliff-edge stay with sweeping views of the Chembra Peak",
    type: "Nature Resort",
    status: "Active",
    badge: "Budget friendly",
    featured: false,
    rating: 4.8,
    reviewsCount: 214,
    likes: "986",
    comments: "214",
    pricePerNight: 3500,
    originalPrice: 4800,
    priceRange: "₹2,000 - ₹5,000",
    location: "Vythiri, Wayanad, Kerala",
    address: "Old Vythiri Ghat Road, Vythiri, Wayanad, Kerala - 673576",
    mapUrl: "https://maps.google.com/?q=Vythiri+Wayanad",
    image: resort2,
    gallery: [resort2, resort3, resort4, resort1, resort5, resort6],
    overview:
      "Perched on the green slopes of Vythiri, Mountain View Eco Resort invites you to immerse in untouched nature. Surrounded by towering silver oaks and cardamom estates, this eco-haven balances comfort with sustainability.\n\nWake up to panoramic valley views, sip freshly brewed estate coffee, and unwind by your private sit-out as clouds drift into your balcony. An ideal getaway for nature enthusiasts, trekkers, and couples seeking peace.",
    highlights: [
      { icon: "landscape", title: "Direct Chembra View", desc: "Front-row seats to Wayanad's highest and most scenic peak." },
      { icon: "eco", title: "100% Eco-Sustainable", desc: "Solar-powered energy, rainwater harvesting, zero single-use plastic." },
      { icon: "local_fire_department", title: "Nightly Bonfires", desc: "Cozy community fireplace under clear starlit skies." },
      { icon: "restaurant", title: "Home-style Kerala Kitchen", desc: "Authentic clay-pot cooking and organic estate teas." }
    ],
    amenities: [
      {
        category: "Popular Amenities",
        items: [
          { name: "Mountain View Balcony", icon: "landscape" },
          { name: "High-Speed Wi-Fi", icon: "wifi" },
          { name: "Complimentary Breakfast", icon: "bakery_dining" },
          { name: "Free Parking", icon: "local_parking" },
          { name: "Estate Nature Trails", icon: "hiking" }
        ]
      },
      {
        category: "Room & Comfort",
        items: [
          { name: "Hot Water Geyser", icon: "water_drop" },
          { name: "Private Veranda", icon: "balcony" },
          { name: "Organic Herbal Toiletries", icon: "bathtub" },
          { name: "Coffee / Tea Station", icon: "coffee" }
        ]
      }
    ],
    rooms: [
      {
        id: "valley-cottage",
        name: "Valley View Cottage",
        type: "Eco Cottage",
        price: 3500,
        originalPrice: 4800,
        size: "360 sq.ft",
        bed: "1 Queen Bed",
        capacity: "2 Guests",
        features: ["Panoramic Balcony", "Hot Shower", "Breakfast Included", "Forest View"],
        image: resort2
      },
      {
        id: "cloud-villa",
        name: "Cloud 9 Wooden Chalet",
        type: "Chalet",
        price: 5200,
        originalPrice: 6500,
        size: "450 sq.ft",
        bed: "1 King Bed",
        capacity: "2 Adults + 1 Child",
        features: ["Elevated Wood Deck", "Glass Wall View", "Bathtub", "Private Garden"],
        image: resort3
      }
    ],
    policies: {
      checkIn: "01:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      pets: "Pets welcome in designated valley cottages.",
      smoking: "Outdoor smoking zones provided.",
      children: "Kids under 5 stay free."
    },
    contact: {
      phone: "+91 94471 88990",
      whatsapp: "+91 94471 88990",
      email: "stay@mountainviewvythiri.com",
      website: "https://mountainviewvythiri.com",
      address: "Old Vythiri Ghat Road, Vythiri, Wayanad, Kerala - 673576"
    },
    reviews: [
      {
        id: "rev-1",
        author: "Meera Krishnan",
        location: "Kochi",
        rating: 5,
        date: "March 2026",
        avatar: "MK",
        comment: "Unmatched view of the hills! Sitting on the balcony with their cardamom tea in the morning is worth every rupee."
      }
    ],
    faqs: [
      {
        q: "Is the road accessible for small hatchback cars?",
        a: "Yes, the approach road is fully tarred and easily accessible by all cars."
      }
    ]
  },
  {
    id: 3,
    name: "Forest Escape Wilderness Resort",
    tagline: "Live inside the rainforest canopy with private stream & plunge pool",
    type: "Eco Resort",
    status: "Active",
    badge: "Premium",
    featured: true,
    rating: 4.9,
    reviewsCount: 438,
    likes: "2.4k",
    comments: "438",
    pricePerNight: 11000,
    originalPrice: 14500,
    priceRange: "₹10,000+",
    location: "Meppadi, Wayanad, Kerala",
    address: "Chundale - Meppadi Road, Meppadi, Wayanad, Kerala - 673577",
    mapUrl: "https://maps.google.com/?q=Meppadi+Wayanad",
    image: resort3,
    gallery: [resort3, resort4, resort5, resort1, resort2, resort6],
    overview:
      "Tucked within a private 40-acre rainforest reserve, Forest Escape is Wayanad's premier wilderness sanctuary. Designed for those seeking seclusion and deep connection with Mother Nature, the property features luxurious wooden villas built around ancient trees, natural mountain streams, and untouched flora.\n\nEnjoy treehouse dining, night safari trails, and private temperature-regulated plunge pools overlooking deep jungle valleys.",
    highlights: [
      { icon: "forest", title: "40-Acre Private Rainforest", desc: "Private access to natural streams, waterfalls, and canopy walks." },
      { icon: "pool", title: "Private Plunge Pools", desc: "Every villa features a private heated infinity plunge pool." },
      { icon: "nights_stay", title: "Night Safari & Birding", desc: "Guided nocturnal wildlife spotting with resident naturalists." },
      { icon: "spa", title: "Forest Spa Pavilion", desc: "Ayurvedic therapy pavilion surrounded by bamboo groves." }
    ],
    amenities: [
      {
        category: "Popular Amenities",
        items: [
          { name: "Private Plunge Pool", icon: "pool" },
          { name: "High-Speed Wi-Fi", icon: "wifi" },
          { name: "All-Meals Included", icon: "restaurant" },
          { name: "Jungle Safari & Treks", icon: "hiking" },
          { name: "Treehouse Lounge", icon: "nature_people" }
        ]
      }
    ],
    rooms: [
      {
        id: "forest-treehouse",
        name: "Canopy Treehouse Villa",
        type: "Treehouse",
        price: 11000,
        originalPrice: 14500,
        size: "520 sq.ft",
        bed: "1 King Bed",
        capacity: "2 Adults",
        features: ["40ft Canopy Elevation", "Private Plunge Pool", "Glass Floor Balcony", "Gourmet Meals Included"],
        image: resort3
      },
      {
        id: "stream-villa",
        name: "Riverstone Stream Villa",
        type: "Water Villa",
        price: 14500,
        originalPrice: 18000,
        size: "750 sq.ft",
        bed: "1 King Bed + 1 Single Bed",
        capacity: "3 Guests",
        features: ["Stream-front Terrace", "Outdoor Jacuzzi", "Dedicated Naturalist", "Personal Chef on Request"],
        image: resort4
      }
    ],
    policies: {
      checkIn: "02:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 72 hours prior to arrival.",
      pets: "Not permitted due to wildlife sanctuary proximity.",
      smoking: "Strict non-smoking forest environment.",
      children: "Children aged 8 and above welcome."
    },
    contact: {
      phone: "+91 97460 22334",
      whatsapp: "+91 97460 22334",
      email: "concierge@forestescapewayanad.com",
      website: "https://forestescapewayanad.com",
      address: "Chundale - Meppadi Road, Meppadi, Wayanad, Kerala - 673577"
    },
    reviews: [
      {
        id: "rev-1",
        author: "Vivek & Shalini",
        location: "Chennai",
        rating: 5,
        date: "March 2026",
        avatar: "VS",
        comment: "Staying 40 feet up in a treehouse with a heated plunge pool was an experience of a lifetime. The sound of rain on the canopy is unforgettable."
      }
    ],
    faqs: [
      {
        q: "Are wild animals safe around the property?",
        a: "Yes, the guest villa enclave is safely enclosed with bio-fencing while preserving the natural forest pathways."
      }
    ]
  },
  {
    id: 4,
    name: "Nature View Heritage Resort",
    tagline: "Traditional Kerala architecture with sprawling spice gardens",
    type: "Family Resort",
    status: "Active",
    badge: "Budget friendly",
    featured: false,
    rating: 4.7,
    reviewsCount: 102,
    likes: "754",
    comments: "102",
    pricePerNight: 2800,
    originalPrice: 3800,
    priceRange: "Under 2000",
    location: "Kalpetta, Wayanad, Kerala",
    address: "Pinangode Road, Kalpetta, Wayanad, Kerala - 673121",
    mapUrl: "https://maps.google.com/?q=Kalpetta+Wayanad",
    image: resort4,
    gallery: [resort4, resort5, resort6, resort1, resort2, resort3],
    overview:
      "A peaceful heritage estate located just 10 minutes from Kalpetta town. Built in classic Nalukettu timber architecture, Nature View Heritage Resort features open courtyards, brass lanterns, and tranquil verandahs looking out to sprawling spice groves.",
    highlights: [
      { icon: "temple_hindu", title: "Heritage Nalukettu Design", desc: "Authentic century-old Kerala courtyard construction." },
      { icon: "grass", title: "Spice & Fruit Orchards", desc: "Walk through pepper, vanilla, and clove plantations." },
      { icon: "family_restroom", title: "Ideal for Large Families", desc: "Spacious inter-connected cottages with kitchen facilities." }
    ],
    amenities: [
      {
        category: "Popular Amenities",
        items: [
          { name: "Free Wi-Fi", icon: "wifi" },
          { name: "Complimentary Breakfast", icon: "bakery_dining" },
          { name: "Free Parking", icon: "local_parking" },
          { name: "Garden Sit-out", icon: "yard" }
        ]
      }
    ],
    rooms: [
      {
        id: "heritage-room",
        name: "Traditional Courtyard Room",
        type: "Heritage Room",
        price: 2800,
        originalPrice: 3800,
        size: "320 sq.ft",
        bed: "1 Queen Bed",
        capacity: "2 Guests",
        features: ["Courtyard View", "Teakwood Furniture", "Breakfast Included"],
        image: resort4
      }
    ],
    policies: {
      checkIn: "12:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in.",
      pets: "Pet-friendly.",
      smoking: "Outdoor smoking only.",
      children: "Children welcome."
    },
    contact: {
      phone: "+91 94473 11223",
      whatsapp: "+91 94473 11223",
      email: "info@natureviewkalpetta.com",
      website: "https://natureviewkalpetta.com",
      address: "Pinangode Road, Kalpetta, Wayanad, Kerala - 673121"
    },
    reviews: [
      {
        id: "rev-1",
        author: "Siddharth Verma",
        location: "Hyderabad",
        rating: 4.8,
        date: "February 2026",
        avatar: "SV",
        comment: "Very cozy and peaceful. The heritage wooden feel and traditional breakfast were delightful."
      }
    ],
    faqs: [
      {
        q: "Is it close to Kalpetta bus stand?",
        a: "Yes, it is just 3.5 km from the main Kalpetta KSRTC bus stand."
      }
    ]
  },
  {
    id: 5,
    name: "Luxury Hills Palace Resort",
    tagline: "Five-star luxury perched on the highest mountain ridgeline",
    type: "Luxury Resort",
    status: "Active",
    badge: "Luxury",
    featured: true,
    rating: 5.0,
    reviewsCount: 562,
    likes: "3.1k",
    comments: "562",
    pricePerNight: 12500,
    originalPrice: 16000,
    priceRange: "₹10,000+",
    location: "Vythiri, Wayanad, Kerala",
    address: "Lakkidi View Point Road, Vythiri, Wayanad, Kerala - 673576",
    mapUrl: "https://maps.google.com/?q=Lakkidi+Wayanad",
    image: resort5,
    gallery: [resort5, resort6, resort1, resort2, resort3, resort4],
    overview:
      "Perched on the crown of the Lakkidi mist pass, Luxury Hills Palace Resort sets the benchmark for ultra-luxury hospitality in Kerala. Enjoy royal suites with 360-degree mountain valley panoramas, private infinity pools, fine dining restaurants, and helicopter transfer services.",
    highlights: [
      { icon: "diamond", title: "5-Star Ultra Luxury", desc: "Award-winning bespoke butler service & premium suites." },
      { icon: "pool", title: "Twin Horizon Pools", desc: "Dual infinity pools hovering over the mist-covered gorge." },
      { icon: "spa", title: "Royal Ayurvedic Pavilion", desc: "Signature Ayurvedic treatments and private sauna baths." }
    ],
    amenities: [
      {
        category: "Popular Amenities",
        items: [
          { name: "Infinity Pool", icon: "pool" },
          { name: "High-Speed Wi-Fi", icon: "wifi" },
          { name: "Fine Dining Restaurant", icon: "restaurant" },
          { name: "Helipad & Valet", icon: "local_parking" },
          { name: "Spa & Salon", icon: "spa" }
        ]
      }
    ],
    rooms: [
      {
        id: "royal-presidential",
        name: "Royal Hilltop Presidential Suite",
        type: "Presidential Suite",
        price: 12500,
        originalPrice: 16000,
        size: "1100 sq.ft",
        bed: "1 King Bed + Living Suite",
        capacity: "2 to 4 Guests",
        features: ["Private Infinity Plunge Pool", "Personal Butler", "Panoramic Mountain View", "All Meals Included"],
        image: resort5
      }
    ],
    policies: {
      checkIn: "02:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours in advance.",
      pets: "Allowed with prior VIP pet concierge registration.",
      smoking: "Designated cigar lounge.",
      children: "Kids welcome."
    },
    contact: {
      phone: "+91 98950 44556",
      whatsapp: "+91 98950 44556",
      email: "vip@luxuryhillswayanad.com",
      website: "https://luxuryhillswayanad.com",
      address: "Lakkidi View Point Road, Vythiri, Wayanad, Kerala - 673576"
    },
    reviews: [
      {
        id: "rev-1",
        author: "Karan Malhotra",
        location: "Delhi",
        rating: 5,
        date: "March 2026",
        avatar: "KM",
        comment: "Words cannot do justice to the views and the butler hospitality. The infinity pool above the clouds is simply surreal."
      }
    ],
    faqs: [
      {
        q: "Do you offer helicopter charter from Cochin or Bangalore?",
        a: "Yes, our concierge provides private helicopter charters landing directly at our on-site helipad."
      }
    ]
  },
  {
    id: 6,
    name: "Green Valley Boutique Resort",
    tagline: "Romantic valley retreat surrounded by tea gardens and streams",
    type: "Boutique Resort",
    status: "Active",
    badge: "Popular",
    featured: false,
    rating: 4.8,
    reviewsCount: 267,
    likes: "1.5k",
    comments: "267",
    pricePerNight: 5500,
    originalPrice: 7200,
    priceRange: "₹5,000 - ₹10,000",
    location: "Sulthan Bathery, Wayanad, Kerala",
    address: "Ambalavayal Road, Sulthan Bathery, Wayanad, Kerala - 673592",
    mapUrl: "https://maps.google.com/?q=Sulthan+Bathery+Wayanad",
    image: resort6,
    gallery: [resort6, resort1, resort2, resort3, resort4, resort5],
    overview:
      "Green Valley Boutique Resort is an intimate retreat nestled in the rolling tea estates of Sulthan Bathery. Designed especially for couples and small families, it combines modern comfort with lush nature trails, outdoor movie nights under the stars, and campfire barbecues.",
    highlights: [
      { icon: "local_florist", title: "Tea Garden Trails", desc: "Direct private access to manicured tea plantation walks." },
      { icon: "theater_comedy", title: "Open-Air Cinema", desc: "Nightly movie screenings on the lawn by the fireplace." },
      { icon: "pool", title: "Garden Swimming Pool", desc: "Crystal clear pool nestled among flowering orchard trees." }
    ],
    amenities: [
      {
        category: "Popular Amenities",
        items: [
          { name: "Garden Pool", icon: "pool" },
          { name: "Wi-Fi Access", icon: "wifi" },
          { name: "Tea Garden Restaurant", icon: "restaurant" },
          { name: "Free Parking", icon: "local_parking" },
          { name: "Campfire & BBQ", icon: "local_fire_department" }
        ]
      }
    ],
    rooms: [
      {
        id: "tea-cottage",
        name: "Tea View Veranda Cottage",
        type: "Boutique Cottage",
        price: 5500,
        originalPrice: 7200,
        size: "420 sq.ft",
        bed: "1 King Bed",
        capacity: "2 Guests",
        features: ["Tea Garden View", "Private Porch", "Complimentary Breakfast", "Espresso Machine"],
        image: resort6
      }
    ],
    policies: {
      checkIn: "01:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 48 hours before arrival.",
      pets: "Pet friendly upon request.",
      smoking: "Outdoor designated zones only.",
      children: "Children under 6 stay free."
    },
    contact: {
      phone: "+91 94475 77889",
      whatsapp: "+91 94475 77889",
      email: "book@greenvalleyresorts.com",
      website: "https://greenvalleyresorts.com",
      address: "Ambalavayal Road, Sulthan Bathery, Wayanad, Kerala - 673592"
    },
    reviews: [
      {
        id: "rev-1",
        author: "Amina & Firoz",
        location: "Kozhikode",
        rating: 5,
        date: "February 2026",
        avatar: "AF",
        comment: "Such a romantic and peaceful vibe! The open-air movie night with warm campfire was the highlight of our trip."
      }
    ],
    faqs: [
      {
        q: "Is it close to Edakkal Caves?",
        a: "Yes, Edakkal Caves is only a 15-minute drive from the resort."
      }
    ]
  }
];

export const getResortById = (id) => {
  if (!id) return resortData[0];
  const normalized = String(id).replace("resort-", "");
  return (
    resortData.find(
      (r) => String(r.id) === normalized || r.name.toLowerCase().includes(normalized.toLowerCase())
    ) || resortData[0]
  );
};

export default resortData;
