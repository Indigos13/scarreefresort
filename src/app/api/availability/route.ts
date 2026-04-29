export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getBlockedDates } from "@/lib/calendar/sync-engine";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const villaId = searchParams.get("villaId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!villaId) {
    return NextResponse.json(
      { error: "villaId is required" },
      { status: 400 }
    );
  }

  // Default date range: today to 12 months from now
  const today = new Date();
  const defaultFrom = today.toISOString().split("T")[0];
  const futureDate = new Date(today);
  futureDate.setMonth(futureDate.getMonth() + 12);
  const defaultTo = futureDate.toISOString().split("T")[0];

  try {
    const blockedDates = await getBlockedDates(
      villaId,
      from || defaultFrom,
      to || defaultTo
    );

    return NextResponse.json({
      villaId,
      from: from || defaultFrom,
      to: to || defaultTo,
      blocked: blockedDates,
    });
  } catch (error) {
    console.error("Availability check error:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
}
