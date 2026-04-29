export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { syncCalendars } from "@/lib/calendar/sync-engine";

// Vercel Cron — runs daily as safety net
// Configure in vercel.json: { "crons": [{ "path": "/api/cron/sync-calendar", "schedule": "0 3 * * *" }] }
export async function GET(request: Request) {
  // Verify cron secret (optional but recommended)
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncCalendars();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error) {
    console.error("Cron sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Cron sync failed",
      },
      { status: 500 }
    );
  }
}
