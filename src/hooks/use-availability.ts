"use client";

import { useState, useEffect, useCallback } from "react";

interface BlockedRange {
  checkIn: string;
  checkOut: string;
  source: string;
}

interface AvailabilityData {
  villaId: string;
  blocked: BlockedRange[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch and manage availability data for a villa.
 * Returns blocked date ranges and a helper function to check if a specific date is blocked.
 */
export function useAvailability(villaId?: string) {
  const [data, setData] = useState<AvailabilityData>({
    villaId: villaId || "",
    blocked: [],
    loading: false,
    error: null,
  });

  const fetchAvailability = useCallback(async (id: string) => {
    setData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(`/api/availability?villaId=${id}`);
      if (!response.ok) throw new Error("Failed to fetch availability");

      const result = await response.json();
      setData({
        villaId: id,
        blocked: result.blocked || [],
        loading: false,
        error: null,
      });
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }));
    }
  }, []);

  useEffect(() => {
    if (villaId) {
      fetchAvailability(villaId);
    }
  }, [villaId, fetchAvailability]);

  /**
   * Check if a specific date falls within any blocked range
   */
  const isDateBlocked = useCallback(
    (date: Date): boolean => {
      const dateStr = date.toISOString().split("T")[0];
      return data.blocked.some((range) => {
        return dateStr >= range.checkIn && dateStr < range.checkOut;
      });
    },
    [data.blocked]
  );

  /**
   * Check if a date range overlaps with any blocked range
   */
  const isRangeBlocked = useCallback(
    (checkIn: Date, checkOut: Date): boolean => {
      const checkInStr = checkIn.toISOString().split("T")[0];
      const checkOutStr = checkOut.toISOString().split("T")[0];

      return data.blocked.some((range) => {
        return checkInStr < range.checkOut && checkOutStr > range.checkIn;
      });
    },
    [data.blocked]
  );

  return {
    ...data,
    isDateBlocked,
    isRangeBlocked,
    refetch: fetchAvailability,
  };
}

/**
 * Hook to fetch availability for ALL villas at once
 */
export function useAllVillasAvailability(villaIds: string[]) {
  const [availability, setAvailability] = useState<
    Record<string, BlockedRange[]>
  >({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (villaIds.length === 0) return;

    setLoading(true);

    Promise.all(
      villaIds.map(async (id) => {
        const response = await fetch(`/api/availability?villaId=${id}`);
        if (!response.ok) return { id, blocked: [] };
        const result = await response.json();
        return { id, blocked: result.blocked || [] };
      })
    )
      .then((results) => {
        const map: Record<string, BlockedRange[]> = {};
        for (const r of results) {
          map[r.id] = r.blocked;
        }
        setAvailability(map);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [villaIds]);

  const isVillaAvailable = useCallback(
    (villaId: string, checkIn: Date, checkOut: Date): boolean => {
      const blocked = availability[villaId] || [];
      const checkInStr = checkIn.toISOString().split("T")[0];
      const checkOutStr = checkOut.toISOString().split("T")[0];

      return !blocked.some((range) => {
        return checkInStr < range.checkOut && checkOutStr > range.checkIn;
      });
    },
    [availability]
  );

  return { availability, loading, isVillaAvailable };
}
