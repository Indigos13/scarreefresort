export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { icalSources } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET — List all iCal sources
export async function GET() {
  try {
    const sources = await db.select().from(icalSources);
    return NextResponse.json({ sources });
  } catch (error) {
    console.error("Error fetching iCal sources:", error);
    return NextResponse.json(
      { error: "Failed to fetch iCal sources" },
      { status: 500 }
    );
  }
}

// POST — Create a new iCal source
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { villaId, platform, icalUrl } = body;

    if (!villaId || !platform || !icalUrl) {
      return NextResponse.json(
        { error: "villaId, platform, and icalUrl are required" },
        { status: 400 }
      );
    }

    if (!["airbnb", "bookingcom"].includes(platform)) {
      return NextResponse.json(
        { error: "platform must be 'airbnb' or 'bookingcom'" },
        { status: 400 }
      );
    }

    const newSource = await db
      .insert(icalSources)
      .values({
        villaId,
        platform,
        icalUrl,
      })
      .returning();

    return NextResponse.json({ source: newSource[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating iCal source:", error);
    return NextResponse.json(
      { error: "Failed to create iCal source" },
      { status: 500 }
    );
  }
}

// PUT — Update an existing iCal source
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, icalUrl } = body;

    if (!id || !icalUrl) {
      return NextResponse.json(
        { error: "id and icalUrl are required" },
        { status: 400 }
      );
    }

    await db
      .update(icalSources)
      .set({ icalUrl })
      .where(eq(icalSources.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating iCal source:", error);
    return NextResponse.json(
      { error: "Failed to update iCal source" },
      { status: 500 }
    );
  }
}

// DELETE — Remove an iCal source
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    await db.delete(icalSources).where(eq(icalSources.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting iCal source:", error);
    return NextResponse.json(
      { error: "Failed to delete iCal source" },
      { status: 500 }
    );
  }
}
