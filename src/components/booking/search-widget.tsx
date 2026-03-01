"use client";

import { useState } from "react";
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

export function SearchWidget() {
    const router = useRouter();
    const [checkIn, setCheckIn] = useState<Date | undefined>();
    const [checkOut, setCheckOut] = useState<Date | undefined>();
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

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

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 sm:p-8 shadow-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    {/* Check-in */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                            Check-in
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white h-12",
                                        !checkIn && "text-white/50"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
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
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Check-out */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                            Check-out
                        </label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white h-12",
                                        !checkOut && "text-white/50"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={checkOut}
                                    onSelect={setCheckOut}
                                    disabled={(date) =>
                                        date < (checkIn || new Date()) ||
                                        (checkIn ? date <= checkIn : false)
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Adults */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                            Adults
                        </label>
                        <div className="flex items-center gap-2 h-12 bg-white/10 border border-white/20 rounded-md px-3">
                            <Users className="h-4 w-4 text-white/60" />
                            <button
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="text-white/60 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
                            >
                                −
                            </button>
                            <span className="text-white font-semibold text-center flex-1">
                                {adults}
                            </span>
                            <button
                                onClick={() => setAdults(Math.min(8, adults + 1))}
                                className="text-white/60 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Children */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/60">
                            Children
                        </label>
                        <div className="flex items-center gap-2 h-12 bg-white/10 border border-white/20 rounded-md px-3">
                            <Baby className="h-4 w-4 text-white/60" />
                            <button
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="text-white/60 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
                            >
                                −
                            </button>
                            <span className="text-white font-semibold text-center flex-1">
                                {children}
                            </span>
                            <button
                                onClick={() => setChildren(Math.min(6, children + 1))}
                                className="text-white/60 hover:text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-transparent select-none hidden lg:block">
                            Search
                        </label>
                        <Button
                            onClick={handleSearch}
                            disabled={!checkIn || !checkOut}
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
