export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { villas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET — Public endpoint: list all active villas
export async function GET() {
  try {
    const activeVillas = await db
      .select()
      .from(villas)
      .where(eq(villas.isActive, true));

    const parsed = activeVillas.map((v) => ({
      id: v.id,
      slug: v.slug,
      name: v.name,
      tagline: v.tagline,
      description: v.description,
      basePrice: v.basePrice,
      addGuestPrice: v.addGuestPrice,
      maxGuests: v.maxGuests,
      bedrooms: v.bedrooms,
      bathrooms: v.bathrooms,
      image: v.image,
      gallery: JSON.parse(v.gallery || "[]"),
      amenities: JSON.parse(v.amenities || "[]"),
      isActive: v.isActive,
    }));

    return NextResponse.json({ villas: parsed });
  } catch (error) {
    console.error("Error fetching villas:", error);
    return NextResponse.json(
      { error: "Failed to fetch villas" },
      { status: 500 }
    );
  }
}
