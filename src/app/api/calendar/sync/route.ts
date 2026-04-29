export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { syncCalendars } from "@/lib/calendar/sync-engine";

export async function POST(request: NextRequest) {
  try {
    // Optional: sync specific villa
    const body = await request.json().catch(() => ({}));
    const villaId = body.villaId as string | undefined;

    const result = await syncCalendars(villaId);

    return NextResponse.json({
      success: true,
      message: `Synced ${result.synced} source(s), imported ${result.eventsImported} event(s)`,
      ...result,
    });
  } catch (error) {
    console.error("Calendar sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to sync calendars",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await syncCalendars();

    return NextResponse.json({
      success: true,
      message: `Synced ${result.synced} source(s), imported ${result.eventsImported} event(s)`,
      ...result,
    });
  } catch (error) {
    console.error("Calendar sync error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to sync calendars",
      },
      { status: 500 }
    );
  }
}
