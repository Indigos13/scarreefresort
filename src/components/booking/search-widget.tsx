"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon, Users, Baby, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { VILLAS } from "@/lib/constants";
import { useAllVillasAvailability } from "@/hooks/use-availability";

interface SearchWidgetProps {
    variant?: "dark" | "light";
}

export function SearchWidget({ variant = "dark" }: SearchWidgetProps) {
    const router = useRouter();
    const [checkIn, setCheckIn] = useState<Date | undefined>();
    const [checkOut, setCheckOut] = useState<Date | undefined>();
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

    const isDark = variant === "dark";

    // Fetch availability for all villas
    const villaIds = useMemo(() => VILLAS.map((v) => v.id), []);
    const { availability, loading: availabilityLoading } =
        useAllVillasAvailability(villaIds);

    // Merge all blocked dates across all villas to find universally blocked dates
    // A date is disabled if ALL villas are blocked on that date
    const isDateBlockedAllVillas = useCallback(
        (date: Date): boolean => {
            if (Object.keys(availability).length === 0) return false;

            const dateStr = date.toISOString().split("T")[0];
            const villaAvailabilities = VILLAS.filter((v) => v.isActive).map((v) => {
                const blocked = availability[v.id] || [];
                return blocked.some(
                    (range) => dateStr >= range.checkIn && dateStr < range.checkOut
                );
            });

            // Only block if ALL active villas are blocked on this date
            return (
                villaAvailabilities.length > 0 &&
                villaAvailabilities.every((isBlocked) => isBlocked)
            );
        },
        [availability]
    );

    const handleSearch = () => {
        if (!checkIn || !checkOut) return;
        const params = new URLSearchParams({
            checkin: format(checkIn, "yyyy-MM-dd"),
            checkout: format(checkOut, "yyyy-MM-dd"),
            adults: adults.toString(),
            children: children.toString(),
        });
        router.push(`/search?${params.toString()}`);
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Style classes based on variant
    const labelClass = isDark
        ? "text-xs font-semibold uppercase tracking-widest text-white/60"
        : "text-xs font-semibold uppercase tracking-widest text-neutral-500";

    const buttonClass = (hasValue: boolean) =>
        isDark
            ? cn(
                "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white h-12",
                !hasValue && "text-white/50"
            )
            : cn(
                "w-full justify-start text-left font-normal bg-neutral-50 border-neutral-200 text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900 h-12",
                !hasValue && "text-neutral-400"
            );

    const counterContainerClass = isDark
        ? "flex items-center gap-2 h-12 bg-white/10 border border-white/20 rounded-md px-3"
        : "flex items-center gap-2 h-12 bg-neutral-50 border border-neutral-200 rounded-md px-3";

    const counterIconClass = isDark ? "h-4 w-4 text-white/60" : "h-4 w-4 text-neutral-400";

    const counterBtnClass = isDark
        ? "text-white/60 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        : "text-neutral-400 hover:text-neutral-900 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-100 transition-colors";

    const counterValueClass = isDark
        ? "text-white font-semibold text-center flex-1"
        : "text-neutral-900 font-semibold text-center flex-1";

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div
                className={
                    isDark
                        ? "bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 sm:p-8 shadow-2xl"
                        : "bg-neutral-50 rounded-2xl border border-neutral-200 p-4 sm:p-6"
                }
            >
                <div
                    className={
                        isDark
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
                            : "grid grid-cols-2 gap-3 items-end"
                    }
                >
                    {/* Check-in */}
                    <div className="space-y-2">
                        <label className={labelClass}>Check-in</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={buttonClass(!!checkIn)}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={checkIn}
                                    onSelect={(date) => {
                                        setCheckIn(date);
                                        if (date && (!checkOut || checkOut <= date)) {
                                            const nextDay = new Date(date);
                                            nextDay.setDate(nextDay.getDate() + 1);
                                            setCheckOut(nextDay);
                                        }
                                    }}
                                    disabled={(date) => {
                                        // Disable past dates
                                        if (date < new Date()) return true;
                                        // Disable dates blocked on ALL villas
                                        return isDateBlockedAllVillas(date);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Check-out */}
                    <div className="space-y-2">
                        <label className={labelClass}>Check-out</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={buttonClass(!!checkOut)}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={checkOut}
                                    onSelect={setCheckOut}
                                    disabled={(date) => {
                                        if (
                                            date < (checkIn || new Date()) ||
                                            (checkIn ? date <= checkIn : false)
                                        ) return true;
                                        return isDateBlockedAllVillas(date);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Adults */}
                    <div className="space-y-2">
                        <label className={labelClass}>Adults</label>
                        <div className={counterContainerClass}>
                            <Users className={counterIconClass} />
                            <button
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className={counterBtnClass}
                            >
                                −
                            </button>
                            <span className={counterValueClass}>{adults}</span>
                            <button
                                onClick={() => setAdults(Math.min(8, adults + 1))}
                                className={counterBtnClass}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Children */}
                    <div className="space-y-2">
                        <label className={labelClass}>Children</label>
                        <div className={counterContainerClass}>
                            <Baby className={counterIconClass} />
                            <button
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className={counterBtnClass}
                            >
                                −
                            </button>
                            <span className={counterValueClass}>{children}</span>
                            <button
                                onClick={() => setChildren(Math.min(6, children + 1))}
                                className={counterBtnClass}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className={cn("space-y-2", !isDark && "col-span-2")}>
                        {isDark && (
                            <label className="text-xs font-semibold uppercase tracking-widest text-transparent select-none hidden lg:block">
                                Search
                            </label>
                        )}
                        <Button
                            onClick={handleSearch}
                            disabled={!checkIn || !checkOut || availabilityLoading}
                            className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all disabled:opacity-50"
                        >
                            <Search className="mr-2 h-5 w-5" />
                            Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
