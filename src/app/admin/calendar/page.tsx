"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Calendar,
  Copy,
  Check,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface Room {
  id: string;
  name: string;
  tagline: string;
  slug: string;
}

interface IcalSource {
  id: string;
  villaId: string;
  platform: string;
  icalUrl: string;
  lastSyncAt: string | null;
  lastSyncStatus: string | null;
  lastSyncError: string | null;
}

export default function AdminCalendarPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [sources, setSources] = useState<IcalSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newUrls, setNewUrls] = useState<
    Record<string, { airbnb: string; bookingcom: string }>
  >({});
  const [saving, setSaving] = useState<string | null>(null);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const fetchData = useCallback(async () => {
    try {
      const [roomsRes, sourcesRes] = await Promise.all([
        fetch("/api/admin/rooms"),
        fetch("/api/admin/ical-sources"),
      ]);
      const roomsData = await roomsRes.json();
      const sourcesData = await sourcesRes.json();
      if (roomsData.rooms) setRooms(roomsData.rooms);
      if (sourcesData.sources) setSources(sourcesData.sources);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/calendar/sync", { method: "POST" });
      const data = await res.json();
      setSyncResult(data.message || "Sync completed");
      fetchData();
    } catch {
      setSyncResult("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const handleSaveSource = async (
    villaId: string,
    platform: string,
    url: string
  ) => {
    if (!url.trim()) return;
    setSaving(`${villaId}-${platform}`);

    try {
      const existing = sources.find(
        (s) => s.villaId === villaId && s.platform === platform
      );

      if (existing) {
        await fetch("/api/admin/ical-sources", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: existing.id, icalUrl: url }),
        });
      } else {
        await fetch("/api/admin/ical-sources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ villaId, platform, icalUrl: url }),
        });
      }

      await fetchData();
      setNewUrls((prev) => ({
        ...prev,
        [villaId]: {
          ...prev[villaId],
          [platform]: "",
        },
      }));
    } catch (error) {
      console.error("Failed to save source:", error);
    } finally {
      setSaving(null);
    }
  };

  const handleDeleteSource = async (id: string) => {
    if (!confirm("Remove this calendar source?")) return;

    try {
      await fetch("/api/admin/ical-sources", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await fetchData();
    } catch (error) {
      console.error("Failed to delete source:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-10 flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center gap-2 text-neutral-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading calendar settings...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white font-[var(--font-outfit)]">
            Calendar Sync
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Synchronize availability with Airbnb & Booking.com
          </p>
        </div>
        <Button
          onClick={handleSync}
          disabled={syncing}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold shadow-lg shadow-amber-500/20"
        >
          {syncing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </>
          )}
        </Button>
      </div>

      {/* Sync result */}
      {syncResult && (
        <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-2 text-sm text-green-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {syncResult}
        </div>
      )}

      {/* How it works */}
      <div className="mb-8 bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-amber-300 font-semibold mb-2">
              How Calendar Sync Works
            </p>
            <div className="text-neutral-400 space-y-1">
              <p>
                <strong className="text-neutral-300">1. Export:</strong> Copy your
                villa&apos;s iCal URL below and paste it into Airbnb & Booking.com
                (Import Calendar section).
              </p>
              <p>
                <strong className="text-neutral-300">2. Import:</strong> Get the iCal
                export URLs from Airbnb & Booking.com and paste them below.
              </p>
              <p>
                <strong className="text-neutral-300">3. Sync:</strong> Calendars sync
                automatically. Click &ldquo;Sync Now&rdquo; for manual refresh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Villa Cards */}
      <div className="space-y-6">
        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-10 w-10 text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-400 text-sm mb-2">
              No rooms configured yet
            </p>
            <p className="text-neutral-600 text-xs">
              Add rooms in the Rooms page first, then configure calendar sync here.
            </p>
          </div>
        ) : (
          rooms.map((room) => {
            const roomSources = sources.filter((s) => s.villaId === room.id);
            const airbnbSource = roomSources.find(
              (s) => s.platform === "airbnb"
            );
            const bookingSource = roomSources.find(
              (s) => s.platform === "bookingcom"
            );
            const exportUrl = `${siteUrl}/api/calendar/${room.id}`;

            return (
              <div
                key={room.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* Villa header */}
                <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{room.name}</h3>
                      <p className="text-neutral-500 text-xs">{room.tagline}</p>
                    </div>
                  </div>
                  {roomSources.length > 0 && (
                    <div className="flex items-center gap-2">
                      {roomSources.map((s) => (
                        <Badge
                          key={s.id}
                          variant="secondary"
                          className={
                            s.lastSyncStatus === "success"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : s.lastSyncStatus === "error"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : "bg-neutral-500/10 text-neutral-400 border-neutral-500/20"
                          }
                        >
                          {s.platform === "airbnb" ? "Airbnb" : "Booking.com"}
                          {s.lastSyncStatus === "success" ? (
                            <CheckCircle2 className="ml-1 h-3 w-3" />
                          ) : s.lastSyncStatus === "error" ? (
                            <AlertCircle className="ml-1 h-3 w-3" />
                          ) : null}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-6">
                  {/* Export URL */}
                  <div>
                    <Label className="text-neutral-300 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Export URL (Copy to Airbnb & Booking.com)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={exportUrl}
                        readOnly
                        className="bg-white/5 border-white/10 text-neutral-300 text-sm font-mono"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(exportUrl, `export-${room.id}`)}
                        className="shrink-0 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                      >
                        {copiedId === `export-${room.id}` ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-white/5" />

                  {/* Import: Airbnb */}
                  <div>
                    <Label className="text-neutral-300 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                      Import from Airbnb
                    </Label>
                    {airbnbSource ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={airbnbSource.icalUrl}
                          readOnly
                          className="bg-white/5 border-white/10 text-neutral-400 text-sm font-mono"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteSource(airbnbSource.id)}
                          className="shrink-0 border-white/10 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Paste Airbnb iCal export URL here..."
                          value={newUrls[room.id]?.airbnb || ""}
                          onChange={(e) =>
                            setNewUrls((prev) => ({
                              ...prev,
                              [room.id]: {
                                ...prev[room.id],
                                airbnb: e.target.value,
                              },
                            }))
                          }
                          className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 text-sm"
                        />
                        <Button
                          onClick={() =>
                            handleSaveSource(
                              room.id,
                              "airbnb",
                              newUrls[room.id]?.airbnb || ""
                            )
                          }
                          disabled={
                            !newUrls[room.id]?.airbnb ||
                            saving === `${room.id}-airbnb`
                          }
                          className="shrink-0 bg-amber-500 hover:bg-amber-400 text-white"
                        >
                          {saving === `${room.id}-airbnb` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    )}
                    {airbnbSource?.lastSyncAt && (
                      <p className="text-xs text-neutral-600 mt-1">
                        Last sync:{" "}
                        {new Date(airbnbSource.lastSyncAt).toLocaleString()}
                        {airbnbSource.lastSyncStatus === "error" && (
                          <span className="text-red-400 ml-2">
                            Error: {airbnbSource.lastSyncError}
                          </span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Import: Booking.com */}
                  <div>
                    <Label className="text-neutral-300 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                      Import from Booking.com
                    </Label>
                    {bookingSource ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={bookingSource.icalUrl}
                          readOnly
                          className="bg-white/5 border-white/10 text-neutral-400 text-sm font-mono"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteSource(bookingSource.id)}
                          className="shrink-0 border-white/10 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Paste Booking.com iCal export URL here..."
                          value={newUrls[room.id]?.bookingcom || ""}
                          onChange={(e) =>
                            setNewUrls((prev) => ({
                              ...prev,
                              [room.id]: {
                                ...prev[room.id],
                                bookingcom: e.target.value,
                              },
                            }))
                          }
                          className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 text-sm"
                        />
                        <Button
                          onClick={() =>
                            handleSaveSource(
                              room.id,
                              "bookingcom",
                              newUrls[room.id]?.bookingcom || ""
                            )
                          }
                          disabled={
                            !newUrls[room.id]?.bookingcom ||
                            saving === `${room.id}-bookingcom`
                          }
                          className="shrink-0 bg-amber-500 hover:bg-amber-400 text-white"
                        >
                          {saving === `${room.id}-bookingcom` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    )}
                    {bookingSource?.lastSyncAt && (
                      <p className="text-xs text-neutral-600 mt-1">
                        Last sync:{" "}
                        {new Date(bookingSource.lastSyncAt).toLocaleString()}
                        {bookingSource.lastSyncStatus === "error" && (
                          <span className="text-red-400 ml-2">
                            Error: {bookingSource.lastSyncError}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
