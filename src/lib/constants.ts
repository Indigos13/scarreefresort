export interface Villa {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  addGuestPrice: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  gallery: string[];
  amenities: string[];
  isActive: boolean;
}

export const VILLAS: Villa[] = [
  {
    id: "1",
    slug: "double-twin-rooms",
    name: "Double & Twin Rooms",
    tagline: "Cozy comfort with garden views",
    description:
      "A beautifully appointed villa offering both double and twin room configurations, perfect for families or small groups. Nestled within lush tropical gardens, this villa combines traditional Balinese charm with modern amenities. Enjoy morning coffee on your private terrace while listening to the sounds of nature.",
    basePrice: 160,
    addGuestPrice: 80,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: "/images/villa-double-twin.png",
    gallery: [
      "/images/villa-double-twin.png",
      "/images/villa-double-twin.png",
      "/images/villa-double-twin.png",
    ],
    amenities: [
      "Air Conditioning",
      "WiFi",
      "Private Terrace",
      "Garden View",
      "Hot Water",
      "Mini Kitchen",
      "Daily Housekeeping",
      "Beach Access",
    ],
    isActive: true,
  },
  {
    id: "2",
    slug: "scar-reef-villa",
    name: "Scar Reef Villa",
    tagline: "Perched above the reef with panoramic views",
    description:
      "Our signature villa sits dramatically on the clifftop, offering uninterrupted panoramic views of Scar Reef and the Indian Ocean beyond. Features a private infinity plunge pool, open-air bathroom, and expansive wooden deck — the ultimate in tropical luxury living. Watch surfers ride the famous reef break from your private terrace.",
    basePrice: 220,
    addGuestPrice: 100,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    image: "/images/villa-scar-reef.png",
    gallery: [
      "/images/villa-scar-reef.png",
      "/images/villa-scar-reef.png",
      "/images/villa-scar-reef.png",
    ],
    amenities: [
      "Private Pool",
      "Ocean View",
      "Air Conditioning",
      "WiFi",
      "Open-Air Bathroom",
      "Full Kitchen",
      "Sundeck",
      "Daily Housekeeping",
      "Beach Access",
      "Surf Spot View",
    ],
    isActive: true,
  },
  {
    id: "3",
    slug: "beach-house",
    name: "Beach House",
    tagline: "Steps from the sand, heart of paradise",
    description:
      "Live the ultimate beachfront dream in our stunning Beach House. With direct access to pristine white sand, a private pool surrounded by tropical gardens, and spacious open-air living areas, this is barefoot luxury at its finest. Fall asleep to the gentle sounds of waves and wake up to spectacular ocean sunrises.",
    basePrice: 280,
    addGuestPrice: 120,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    image: "/images/villa-beach-house.png",
    gallery: [
      "/images/villa-beach-house.png",
      "/images/villa-beach-house.png",
      "/images/villa-beach-house.png",
    ],
    amenities: [
      "Beachfront",
      "Private Pool",
      "Air Conditioning",
      "WiFi",
      "Full Kitchen",
      "Outdoor Dining",
      "BBQ Area",
      "Sundeck",
      "Daily Housekeeping",
      "Direct Beach Access",
      "Outdoor Shower",
      "Parking",
    ],
    isActive: true,
  },
];

export const SITE_CONFIG = {
  name: "Scar Reef Resort",
  tagline: "Exclusive Beachfront Villas",
  description:
    "Discover paradise at Scar Reef Resort — three exclusive beachfront villas nestled along the pristine coastline. Experience luxury, privacy, and breathtaking ocean views.",
  address: "Scar Reef Beach, Sumba Island, East Nusa Tenggara, Indonesia",
  email: "hello@scarreefresort.com",
  phone: "+62 812 3456 7890",
  instagram: "https://instagram.com/scarreefresort",
  whatsapp: "https://wa.me/6281234567890",
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
