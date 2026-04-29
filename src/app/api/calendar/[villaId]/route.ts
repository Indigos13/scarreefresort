export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { reservations } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import icalGenerator from "ical-generator";
import { VILLAS } from "@/lib/constants";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ villaId: string }> }
) {
  const { villaId } = await params;

  // Validate villa exists
  const villa = VILLAS.find((v) => v.id === villaId);
  if (!villa) {
    return NextResponse.json({ error: "Villa not found" }, { status: 404 });
  }

  try {
    // Get all confirmed reservations for this villa
    const villaReservations = await db
      .select()
      .from(reservations)
      .where(
        and(
          eq(reservations.villaId, villaId),
          eq(reservations.status, "confirmed")
        )
      );

    // Generate iCal feed
    const calendar = icalGenerator({
      name: `${villa.name} — Scar Reef Resort`,
      prodId: {
        company: "Scar Reef Resort",
        product: "Booking Calendar",
      },
    });

    for (const reservation of villaReservations) {
      const event = calendar.createEvent({
        start: new Date(reservation.checkIn + "T14:00:00"),
        end: new Date(reservation.checkOut + "T11:00:00"),
        summary: reservation.summary || `Booking - ${villa.name}`,
        description: `Source: ${reservation.source}${reservation.guestName ? ` | Guest: ${reservation.guestName}` : ""}`,
        stamp: new Date(reservation.createdAt),
      });
      event.uid(reservation.externalId || reservation.id);
    }

    // Return as .ics file
    const icsContent = calendar.toString();

    return new NextResponse(icsContent, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${villa.slug}.ics"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("iCal export error:", error);
    return NextResponse.json(
      { error: "Failed to generate calendar" },
      { status: 500 }
    );
  }
}
