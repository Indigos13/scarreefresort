"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Home,
  Users,
  RefreshCw,
  ExternalLink,
  ArrowRight,
  BedDouble,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Room {
  id: string;
  name: string;
  basePrice: number;
  maxGuests: number;
  isActive: boolean;
}

interface SyncStatus {
  villaId: string;
  platform: string;
  lastSyncAt: string | null;
  lastSyncStatus: string | null;
}

export default function AdminDashboardPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [syncStatuses, setSyncStatuses] = useState<SyncStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/rooms").then((r) => r.json()),
      fetch("/api/admin/ical-sources").then((r) => r.json()),
    ])
      .then(([roomsData, sourcesData]) => {
        if (roomsData.rooms) setRooms(roomsData.rooms);
        if (sourcesData.sources) {
          setSyncStatuses(
            sourcesData.sources.map(
              (s: {
                villaId: string;
                platform: string;
                lastSyncAt: string | null;
                lastSyncStatus: string | null;
              }) => ({
                villaId: s.villaId,
                platform: s.platform,
                lastSyncAt: s.lastSyncAt,
                lastSyncStatus: s.lastSyncStatus,
              })
            )
          );
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const getRoomName = (villaId: string) =>
    rooms.find((r) => r.id === villaId)?.name || villaId;

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-[var(--font-outfit)]">
          Dashboard
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Welcome to Scar Reef Resort admin panel
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {loading ? (
          <div className="col-span-3 flex items-center gap-2 text-neutral-500 text-sm py-8 justify-center">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading rooms...
          </div>
        ) : rooms.length === 0 ? (
          <div className="col-span-3 text-center py-8">
            <BedDouble className="h-10 w-10 text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-400 text-sm mb-2">No rooms configured yet</p>
            <Link href="/admin/rooms">
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold"
              >
                Add Rooms
              </Button>
            </Link>
          </div>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Home className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{room.name}</p>
                  <p className="text-neutral-500 text-xs">${room.basePrice}/night</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Users className="h-3.5 w-3.5" />
                Max {room.maxGuests} guests
              </div>
            </div>
          ))
        )}
      </div>

      {/* Calendar Sync Status */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Calendar Sync Status</h2>
          </div>
          <Link href="/admin/calendar">
            <Button
              variant="ghost"
              className="text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 text-sm"
            >
              Manage
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-neutral-500 text-sm py-4">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading sync status...
          </div>
        ) : syncStatuses.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-10 w-10 text-neutral-700 mx-auto mb-3" />
            <p className="text-neutral-400 text-sm mb-2">
              No calendar sources configured yet
            </p>
            <p className="text-neutral-600 text-xs mb-4">
              Set up Airbnb and Booking.com iCal sync to prevent double bookings
            </p>
            <Link href="/admin/calendar">
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Configure Calendar Sync
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {syncStatuses.map((status, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      status.lastSyncStatus === "success"
                        ? "bg-green-400"
                        : status.lastSyncStatus === "error"
                        ? "bg-red-400"
                        : "bg-neutral-600"
                    }`}
                  />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {getRoomName(status.villaId)}
                    </p>
                    <p className="text-neutral-500 text-xs capitalize">
                      {status.platform}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-neutral-400 text-xs">
                    {status.lastSyncAt
                      ? `Last sync: ${new Date(status.lastSyncAt).toLocaleString()}`
                      : "Never synced"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
