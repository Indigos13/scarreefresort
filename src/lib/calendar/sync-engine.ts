import { db } from "@/lib/db";
import { reservations, icalSources } from "@/lib/db/schema";
import { eq, and, gte, lte, or } from "drizzle-orm";
import ical from "node-ical";

const SYNC_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Check if a villa's iCal sources need syncing (stale > 15 min)
 */
export async function shouldSync(villaId?: string): Promise<boolean> {
  const sources = villaId
    ? await db
        .select()
        .from(icalSources)
        .where(eq(icalSources.villaId, villaId))
    : await db.select().from(icalSources);

  if (sources.length === 0) return false;

  const now = Date.now();
  return sources.some((source) => {
    if (!source.lastSyncAt) return true;
    const lastSync = new Date(source.lastSyncAt).getTime();
    return now - lastSync > SYNC_INTERVAL_MS;
  });
}

/**
 * Sync all iCal sources for a specific villa or all villas
 */
export async function syncCalendars(villaId?: string): Promise<{
  synced: number;
  errors: string[];
  eventsImported: number;
}> {
  const sources = villaId
    ? await db
        .select()
        .from(icalSources)
        .where(eq(icalSources.villaId, villaId))
    : await db.select().from(icalSources);

  let synced = 0;
  let eventsImported = 0;
  const errors: string[] = [];

  for (const source of sources) {
    try {
      const events = await fetchAndParseIcal(source.icalUrl);
      const imported = await upsertReservationsFromIcal(
        source.villaId,
        source.platform,
        events
      );

      eventsImported += imported;
      synced++;

      // Update last sync status
      await db
        .update(icalSources)
        .set({
          lastSyncAt: new Date().toISOString(),
          lastSyncStatus: "success",
          lastSyncError: null,
        })
        .where(eq(icalSources.id, source.id));
    } catch (error) {
      const errorMsg = `Failed to sync ${source.platform} for villa ${source.villaId}: ${error instanceof Error ? error.message : "Unknown error"}`;
      errors.push(errorMsg);

      await db
        .update(icalSources)
        .set({
          lastSyncAt: new Date().toISOString(),
          lastSyncStatus: "error",
          lastSyncError: errorMsg,
        })
        .where(eq(icalSources.id, source.id));
    }
  }

  return { synced, errors, eventsImported };
}

/**
 * Fetch and parse an iCal URL, returning VEVENT entries
 */
async function fetchAndParseIcal(
  url: string
): Promise<
  {
    uid: string;
    summary: string;
    start: Date;
    end: Date;
  }[]
> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ScarReefResort-CalendarSync/1.0",
    },
    next: { revalidate: 0 }, // No cache
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const icsText = await response.text();
  const parsed = ical.sync.parseICS(icsText);
  const events: {
    uid: string;
    summary: string;
    start: Date;
    end: Date;
  }[] = [];

  for (const key in parsed) {
    const event = parsed[key];
    if (!event) continue;
    if (event.type === "VEVENT" && event.start && event.end) {
      events.push({
        uid: event.uid || key,
        summary: (event.summary as string) || "Blocked",
        start: new Date(event.start as unknown as string),
        end: new Date(event.end as unknown as string),
      });
    }
  }

  return events;
}

/**
 * Upsert reservations from parsed iCal events
 * Uses externalId (iCal UID) for deduplication
 */
async function upsertReservationsFromIcal(
  villaId: string,
  platform: string,
  events: {
    uid: string;
    summary: string;
    start: Date;
    end: Date;
  }[]
): Promise<number> {
  let imported = 0;

  for (const event of events) {
    const externalId = `${platform}:${event.uid}`;

    // Check if this event already exists
    const existing = await db
      .select()
      .from(reservations)
      .where(eq(reservations.externalId, externalId))
      .limit(1);

    const checkIn = event.start.toISOString().split("T")[0];
    const checkOut = event.end.toISOString().split("T")[0];

    if (existing.length > 0) {
      // Update existing reservation if dates changed
      if (
        existing[0].checkIn !== checkIn ||
        existing[0].checkOut !== checkOut
      ) {
        await db
          .update(reservations)
          .set({
            checkIn,
            checkOut,
            summary: event.summary,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(reservations.id, existing[0].id));
        imported++;
      }
    } else {
      // Insert new reservation
      await db.insert(reservations).values({
        villaId,
        checkIn,
        checkOut,
        source: platform,
        externalId,
        summary: event.summary,
        status: "confirmed",
      });
      imported++;
    }
  }

  return imported;
}

/**
 * Get blocked date ranges for a villa within a date range
 */
export async function getBlockedDates(
  villaId: string,
  from: string,
  to: string
): Promise<{ checkIn: string; checkOut: string; source: string }[]> {
  // Trigger on-demand sync if stale
  const needsSync = await shouldSync(villaId);
  if (needsSync) {
    // Sync in background — don't block the response
    syncCalendars(villaId).catch(console.error);
  }

  const blocked = await db
    .select({
      checkIn: reservations.checkIn,
      checkOut: reservations.checkOut,
      source: reservations.source,
    })
    .from(reservations)
    .where(
      and(
        eq(reservations.villaId, villaId),
        eq(reservations.status, "confirmed"),
        // Overlapping date range check
        or(
          and(gte(reservations.checkIn, from), lte(reservations.checkIn, to)),
          and(gte(reservations.checkOut, from), lte(reservations.checkOut, to)),
          and(lte(reservations.checkIn, from), gte(reservations.checkOut, to))
        )
      )
    );

  return blocked;
}
