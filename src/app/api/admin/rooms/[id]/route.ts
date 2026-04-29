export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { villas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET — Get a single room by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db.select().from(villas).where(eq(villas.id, id));

    if (result.length === 0) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const room = result[0];
    return NextResponse.json({
      room: {
        ...room,
        gallery: JSON.parse(room.gallery || "[]"),
        amenities: JSON.parse(room.amenities || "[]"),
      },
    });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room" },
      { status: 500 }
    );
  }
}
