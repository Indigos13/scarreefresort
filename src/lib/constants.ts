export interface Villa {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  addGuestPrice: number;
  discountPercent: string;
  maxGuests: number;
  minNights: number;
  size: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  gallery: string[];
  amenities: string[];
  equipment: string[];
  inclusivePackage: string[];
  isActive: boolean;
}

export const VILLAS: Villa[] = [
  {
    id: "1",
    slug: "double-twin-rooms",
    name: "Double & Twin Rooms",
    subtitle: "(HALF BOARD)",
    tagline: "The comfiest beds in Sumbawa",
    description:
      "It's all about the hand picked furniture and the comfiest beds in Sumbawa. Enjoy our superior rooms that are equipped with en suite bathrooms, air conditioning, Wifi, TV and private terraces.",
    shortDescription:
      "It's all about the hand picked furniture and the comfiest beds in Sumbawa. Enjoy our superior rooms that are equipped with en suite bathrooms, air conditioning, Wifi, TV and private terraces.",
    basePrice: 160,
    addGuestPrice: 80,
    discountPercent: "-50%",
    maxGuests: 2,
    minNights: 2,
    size: "30 m²",
    bedrooms: 1,
    bathrooms: 1,
    image: "/images/villa-double-twin.jpg",
    gallery: [
      "/images/rooms/double-twin-1.jpg",
      "/images/rooms/double-twin-2.jpg",
      "/images/rooms/double-twin-3.jpg",
      "/images/rooms/double-twin-4.jpg",
    ],
    equipment: [
      "WiFi",
      "Double queen size bed",
      "Air conditioning",
      "Private Bathroom",
      "Hot water",
      "Towels & toiletries",
      "Garden & private terrace",
      "Safety box",
    ],
    amenities: [
      "Air Conditioning",
      "WiFi",
      "Private Terrace",
      "Garden View",
      "Hot Water",
      "TV",
      "Daily Housekeeping",
      "Beach Access",
    ],
    inclusivePackage: [
      "Breakfast and lunch fresh out of our delicious kitchen",
      "Unlimited local coffee, tea, water",
      "A beach barbecue (Saturday night)",
      "A chill-out evening around the bonfire",
      "Boat shuttles within Scar Reef Bay",
      "Stand up paddles",
      "Snorkeling gears",
      "Access to our beautiful Yoga Shala and all equipment",
      "Beach tennis",
    ],
    isActive: true,
  },
  {
    id: "2",
    slug: "scar-reef-villa",
    name: "Scar Reef Villa",
    subtitle: "(HALF BOARD)",
    tagline: "A place to call home",
    description:
      "The Scar Reef Villa is our luxury beachfront villa offering an invitation to tropical living with hand-picked furniture and super comfy beds. Enjoy unforgettable sea views and sunsets from your open-plan living area, and relax in the air-conditioned bedrooms. The villa provides views not only of the sea but also of the park, as it is integrated within it and includes a private garden. Sleep like a baby in the master and mezzanine rooms. Two indoor/outdoor tropical bathrooms await for showering under the stars with solar-powered hot water. Island living has never felt better.",
    shortDescription:
      "A few steps away from the beach, this stunning villa sleeps up to 6 people. Enjoy the luxury bedding, air conditioning, Wifi, open spaces, hand picked furniture and sea views. A place to call home.",
    basePrice: 295,
    addGuestPrice: 115,
    discountPercent: "-61%",
    maxGuests: 6,
    minNights: 2,
    size: "100 m²",
    bedrooms: 2,
    bathrooms: 2,
    image: "/images/villa-scar-reef.jpg",
    gallery: [
      "/images/rooms/villa-1.jpg",
      "/images/rooms/villa-2.jpg",
      "/images/rooms/villa-3.jpg",
      "/images/rooms/villa-4.jpg",
      "/images/rooms/villa-5.jpg",
    ],
    equipment: [
      "WiFi",
      "Air conditioning",
      "Open-plan living area",
      "Sea views",
      "Private garden",
      "Master bedroom",
      "Mezzanine room",
      "Indoor/outdoor bathrooms",
      "Solar-powered hot water",
      "Hand-picked furniture",
    ],
    amenities: [
      "Sea View",
      "Air Conditioning",
      "WiFi",
      "Open-Air Bathroom",
      "Private Garden",
      "Sundeck",
      "Daily Housekeeping",
      "Beach Access",
      "Surf Spot View",
    ],
    inclusivePackage: [
      "Breakfast and lunch fresh out of our delicious kitchen",
      "Unlimited local coffee, tea, water",
      "A beach barbecue (Saturday night)",
      "A chill-out evening around the bonfire",
      "Boat shuttles within Scar Reef Bay",
      "Stand up paddles",
      "Snorkeling gears",
      "Access to our beautiful Yoga Shala and all equipment",
      "Beach tennis",
    ],
    isActive: true,
  },
  {
    id: "3",
    slug: "beach-house",
    name: "Beach House",
    subtitle: "(HALF BOARD)",
    tagline: "The jewel of Scar Reef Resort",
    description:
      "The Beach House is the jewel of Scar Reef Resort, a luxury home built on stilts overlooking one of the most stunning beaches on the planet. Crafted from teak in the style of a chic tropical beachfront cabin, this villa not only faces the beautiful wave of Scar Reef but also offers a private side with direct beach access right in front of the villa and exclusive butler service. The Beach House provides all the creature comforts a globetrotter can expect: air conditioning, hot water, TV, WiFi, an XXL king-size bed, and a self-contained kitchen. It's the perfect island getaway for honeymooners or couples looking for an intimate escape.",
    shortDescription:
      "The quintessence of beachfront living in tropical paradise. It sprawls over an amazing 200m² surface. It includes a master suite & private terrace opposite the most exquisite sea view.",
    basePrice: 430,
    addGuestPrice: 175,
    discountPercent: "-59%",
    maxGuests: 2,
    minNights: 3,
    size: "200 m²",
    bedrooms: 1,
    bathrooms: 1,
    image: "/images/villa-beach-house.jpg",
    gallery: [
      "/images/rooms/beach-house-1.jpg",
      "/images/rooms/beach-house-2.jpg",
      "/images/rooms/beach-house-3.jpg",
      "/images/rooms/beach-house-4.jpg",
      "/images/rooms/beach-house-5.jpg",
    ],
    equipment: [
      "WiFi",
      "Air conditioning",
      "XXL king-size bed",
      "TV",
      "Hot water",
      "Self-contained kitchen",
      "Direct beach access",
      "Butler service",
      "Built on stilts",
      "Teak craftsmanship",
    ],
    amenities: [
      "Beachfront",
      "Direct Beach Access",
      "Air Conditioning",
      "WiFi",
      "Self-contained Kitchen",
      "Butler Service",
      "TV",
      "Sundeck",
      "Daily Housekeeping",
      "Private Terrace",
      "Outdoor Shower",
    ],
    inclusivePackage: [
      "Breakfast and lunch fresh out of our delicious kitchen",
      "Unlimited local coffee, tea, water",
      "A beach barbecue (Saturday night)",
      "A chill-out evening around the bonfire",
      "Boat shuttles within Scar Reef Bay",
      "Stand up paddles",
      "Snorkeling gears",
      "Access to our beautiful Yoga Shala and all equipment",
      "Beach tennis",
    ],
    isActive: true,
  },
];

export const SITE_CONFIG = {
  name: "Scar Reef Resort",
  tagline: "Paradise Surf-Resort",
  heroTitle: "WEST SUMBAWA PARADISE SURF-RESORT",
  description:
    "Imagine a lush tropical paradise on the shores of a bright turquoise lagoon, opposite a world class wave in Indonesia. You have arrived at Scar Reef Resort. A boutique eco-resort located in a majestic and unique location. Find peace, quiet and yourself in West Sumbawa.",
  address: "Pantai Jelenga, West Sumbawa, West Nusa Tenggara, Indonesia",
  fullAddress:
    "RT 12 RW 05 dusun Jelenga Desa Beru Kecamatan Jereweh 84356, Kabupaten Sumbawa Barat",
  email: "booking@scarreefresort.com",
  phone: "+62 812 35 77 56 27",
  instagram: "https://instagram.com/scarreefresort",
  facebook: "https://www.facebook.com/scarreefresort",
  whatsapp: "https://wa.me/6281235775627",
  videoUrl:
    "https://www.scarreefresort.com/wp-content/uploads/2025/06/scar_wide_opti.mp4",
  owners: "Francois & Andy",
  legalEntity: "PT Sobawa",
  highSeason: {
    start: "June 15",
    end: "September 15",
    note: "During high season, all bookings are confirmed only with full payment.",
  },
  checkIn: "3:00 PM",
  checkOut: "10:00 AM",
  minChildAge: 6,
  promo: "Early Season 2026 >> Promo 20%",
};

export const ACTIVITIES = [
  {
    name: "Surf coach (coach + board)",
    unit: "per person / day",
    category: "surf",
  },
  {
    name: "Surf guide (guide + board)",
    unit: "per person / day",
    category: "surf",
  },
  {
    name: "Boat shuttles to Scar Reef / Little Beguin (1way)",
    unit: "per unit",
    category: "surf",
  },
  {
    name: "Boat shuttles to Fantom (1way)",
    unit: "per person",
    category: "surf",
  },
  {
    name: "Snorkeling (2H) Outside Jelenga Bay",
    unit: "per person",
    note: "min 2 persons",
    category: "water",
  },
  {
    name: "Snorkeling (2H) Jelenga Bay",
    unit: "per person",
    note: "min 2 persons",
    category: "water",
  },
  {
    name: "Stand up paddle coach (coach + board)",
    unit: "per person / day",
    category: "water",
  },
  {
    name: "Foil coach (coach + foil) (1H)",
    unit: "per person / day",
    category: "water",
  },
  { name: "Foil towing", unit: "per person / day", category: "water" },
  {
    name: "Foil Discovery (30min)",
    unit: "per person / day",
    category: "water",
  },
  {
    name: "Fishing trip Jelenga Bay",
    unit: "per unit",
    category: "adventure",
  },
  { name: "Beach tennis", unit: "per unit", category: "leisure" },
  {
    name: "Yoga shala access (with equipment) (1H30)",
    unit: "per person",
    category: "wellness",
  },
];

export const TESTIMONIALS = [
  {
    name: "Marco S",
    rating: 5,
    text: "Great Waves! Perfect location!! Super Staff !!! and Awesome hosts !!!! Highly recommended for couples and families with small children!!!! Paradise on earth",
  },
  {
    name: "Paul D",
    rating: 5,
    text: "Ahhh...'The Serenity' ! Francois, Andy and their friendly, smiling & helpful staff were so pleased to help make our stay as comfortable as possible. It's quite remote & that's why we paid the visit. The accommodation was clean and comfortable and the location is magical...",
  },
  {
    name: "Tatiana S",
    rating: 5,
    text: "Great place. We were in the end of January. Spend 2 nights. No people, quiet (cause of rainy season)! Very beautiful nature, perfect beach, very polite and kind people work there.",
  },
  {
    name: "Arthur B",
    rating: 5,
    text: "Amazing place and Amazing people! Can't wait to Go back!",
  },
  {
    name: "Sophie B",
    rating: 5,
    text: "Magic place !!! I will be back soon.",
  },
];

export const TRANSPORT_OPTIONS = [
  {
    id: "option-1",
    icon: "✅",
    title: "Via Sumbawa Besar Airport (SWQ)",
    recommended: true,
    steps: [
      "Direct flight from Bali (DPS) to Sumbawa Besar (SWQ) — daily departure around 10:00 AM, arrival 11:00 AM",
      "Private car transfer to Scar Reef Resort (±2.5 hours)",
    ],
    note: "This is the simplest and most time-efficient route — you can be surfing by mid-afternoon.",
  },
  {
    id: "option-2",
    icon: "✈️",
    title: "Via Lombok Airport + Private Fast Boat",
    recommended: false,
    steps: [
      "Fly to Lombok International Airport (LOP)",
      "Private taxi to Tanjung or Telong Elong Harbour (±1 hour)",
      "Private fast boat directly to Scar Reef Resort (±40 minutes, weather dependent)",
    ],
    note: "You'll arrive right on the beach — steps from your bungalow.",
  },
  {
    id: "option-3",
    icon: "🛥️",
    title: "Plane + Public Ferry",
    recommended: false,
    steps: [
      "Fly to Lombok International Airport (LOP)",
      "Taxi to Kayangan Harbour (±2 hours)",
      "Public ferry to Pototano Harbour in Sumbawa (±1.5 hours)",
      "Taxi to Scar Reef Resort (±1 hour)",
    ],
    note: "Need help planning? We'll gladly arrange the full journey for you — just ask.",
  },
];

export const PACKING_LIST = {
  general: [
    "Laptop or tablet",
    "Cash",
    "Books",
    "Sunglasses",
    "Camera",
    "Passport",
    "Visa (if necessary)",
    "Electric adapter 230V",
    "Energy snacks",
    "Allergy medication",
    "Moisturiser",
    "Bug spray",
    "Sandals",
    "Beach towels",
    "Toothbrush",
    "Toothpaste",
    "Conditioner",
    "Your favorite shower gel",
  ],
  surfTrip: [
    "Surfboards & board bag",
    "Boardshorts",
    "Bikinis and/or surfsuits",
    "Fins and fin key",
    "Leashes",
    "Reef booties",
    "Surf hat",
    "Reef friendly sunblock and zinc",
    "Snorkeling gear",
    "Wax and wax comb",
    "Ding repair kit",
  ],
  notNeeded: [
    "Soap",
    "Linen",
    "Food",
    "Beverages",
    "Alcohol",
    "Yoga mats",
  ],
};

export function calculatePrice(
  basePrice: number,
  addGuestPrice: number,
  adults: number,
  children: number,
  nights: number
): {
  firstGuestTotal: number;
  extraAdultsTotal: number;
  childrenTotal: number;
  totalPerNight: number;
  grandTotal: number;
  breakdown: string[];
} {
  const extraAdults = Math.max(0, adults - 1);
  const childPrice = addGuestPrice * 0.5;

  const firstGuestPerNight = basePrice;
  const extraAdultsPerNight = extraAdults * addGuestPrice;
  const childrenPerNight = children * childPrice;
  const totalPerNight =
    firstGuestPerNight + extraAdultsPerNight + childrenPerNight;
  const grandTotal = totalPerNight * nights;

  const breakdown: string[] = [
    `1st guest: $${basePrice}/night`,
  ];
  if (extraAdults > 0) {
    breakdown.push(
      `${extraAdults} extra adult${extraAdults > 1 ? "s" : ""}: $${addGuestPrice}/night each`
    );
  }
  if (children > 0) {
    breakdown.push(
      `${children} child${children > 1 ? "ren" : ""}: $${childPrice}/night each`
    );
  }

  return {
    firstGuestTotal: firstGuestPerNight * nights,
    extraAdultsTotal: extraAdultsPerNight * nights,
    childrenTotal: childrenPerNight * nights,
    totalPerNight,
    grandTotal,
    breakdown,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getVillaBySlug(slug: string): Villa | undefined {
  return VILLAS.find((v) => v.slug === slug);
}
