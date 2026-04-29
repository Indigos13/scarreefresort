"use client";

import { useEffect, useState, useCallback, use } from "react";
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
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface RoomInfo {
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

export default function RoomCalendarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: roomId } = use(params);
  const [room, setRoom] = useState<RoomInfo | null>(null);
  const [sources, setSources] = useState<IcalSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [airbnbUrl, setAirbnbUrl] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const fetchData = useCallback(async () => {
    try {
      // Fetch room info
      const roomRes = await fetch(`/api/admin/rooms/${roomId}`);
      const roomData = await roomRes.json();
      if (roomData.room) {
        setRoom(roomData.room);
      }

      // Fetch iCal sources for this room
      const sourceRes = await fetch("/api/admin/ical-sources");
      const sourceData = await sourceRes.json();
      if (sourceData.sources) {
        setSources(
          sourceData.sources.filter(
            (s: IcalSource) => s.villaId === roomId
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, [roomId]);

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

  const handleSaveSource = async (platform: string, url: string) => {
    if (!url.trim()) return;
    setSaving(platform);

    try {
      const existing = sources.find(
        (s) => s.villaId === roomId && s.platform === platform
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
          body: JSON.stringify({ villaId: roomId, platform, icalUrl: url }),
        });
      }

      await fetchData();
      if (platform === "airbnb") setAirbnbUrl("");
      else setBookingUrl("");
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

  if (!room) {
    return (
      <div className="p-6 lg:p-10 text-center py-16">
        <p className="text-neutral-400">Room not found</p>
        <Link href="/admin/rooms">
          <Button variant="ghost" className="mt-4 text-neutral-400">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Rooms
          </Button>
        </Link>
      </div>
    );
  }

  const airbnbSource = sources.find((s) => s.platform === "airbnb");
  const bookingSource = sources.find((s) => s.platform === "bookingcom");
  const exportUrl = `${siteUrl}/api/calendar/${roomId}`;

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/rooms">
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white font-[var(--font-outfit)]">
            {room.name} — Calendar Sync
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
                <strong className="text-neutral-300">1. Export:</strong> Copy
                the iCal URL below and paste it into Airbnb & Booking.com
                (Import Calendar section).
              </p>
              <p>
                <strong className="text-neutral-300">2. Import:</strong> Get the
                iCal export URLs from Airbnb & Booking.com and paste them below.
              </p>
              <p>
                <strong className="text-neutral-300">3. Sync:</strong> Calendars
                sync automatically. Click &ldquo;Sync Now&rdquo; for manual
                refresh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Settings Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        {/* Card header */}
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
          {sources.length > 0 && (
            <div className="flex items-center gap-2">
              {sources.map((s) => (
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
                onClick={() => handleCopy(exportUrl, "export")}
                className="shrink-0 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
              >
                {copiedId === "export" ? (
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
                  value={airbnbUrl}
                  onChange={(e) => setAirbnbUrl(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 text-sm"
                />
                <Button
                  onClick={() => handleSaveSource("airbnb", airbnbUrl)}
                  disabled={!airbnbUrl || saving === "airbnb"}
                  className="shrink-0 bg-amber-500 hover:bg-amber-400 text-white"
                >
                  {saving === "airbnb" ? (
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
                  value={bookingUrl}
                  onChange={(e) => setBookingUrl(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 text-sm"
                />
                <Button
                  onClick={() => handleSaveSource("bookingcom", bookingUrl)}
                  disabled={!bookingUrl || saving === "bookingcom"}
                  className="shrink-0 bg-amber-500 hover:bg-amber-400 text-white"
                >
                  {saving === "bookingcom" ? (
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
    </div>
  );
}
