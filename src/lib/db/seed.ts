import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { villas } from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

const SEED_VILLAS = [
  {
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
    gallery: JSON.stringify([
      "/images/villa-double-twin.png",
      "/images/villa-double-twin.png",
      "/images/villa-double-twin.png",
    ]),
    amenities: JSON.stringify([
      "Air Conditioning",
      "WiFi",
      "Private Terrace",
      "Garden View",
      "Hot Water",
      "Mini Kitchen",
      "Daily Housekeeping",
      "Beach Access",
    ]),
    isActive: true,
  },
  {
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
    gallery: JSON.stringify([
      "/images/villa-scar-reef.png",
      "/images/villa-scar-reef.png",
      "/images/villa-scar-reef.png",
    ]),
    amenities: JSON.stringify([
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
    ]),
    isActive: true,
  },
  {
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
    gallery: JSON.stringify([
      "/images/villa-beach-house.png",
      "/images/villa-beach-house.png",
      "/images/villa-beach-house.png",
    ]),
    amenities: JSON.stringify([
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
    ]),
    isActive: true,
  },
];

async function seed() {
  console.log("🌱 Seeding villas...");

  for (const villa of SEED_VILLAS) {
    try {
      await db.insert(villas).values(villa);
      console.log(`  ✅ Created: ${villa.name}`);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      if (errMsg.includes("UNIQUE constraint")) {
        console.log(`  ⏭️  Skipped (already exists): ${villa.name}`);
      } else {
        console.error(`  ❌ Error creating ${villa.name}:`, errMsg);
      }
    }
  }

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

seed();
