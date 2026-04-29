"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    CalendarDays,
    Users,
    Baby,
    BedDouble,
    Bath,
    ArrowRight,
    AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { VILLAS, calculatePrice, formatCurrency } from "@/lib/constants";
import { useAllVillasAvailability } from "@/hooks/use-availability";

function SearchResults() {
    const searchParams = useSearchParams();
    const checkin = searchParams.get("checkin") || "";
    const checkout = searchParams.get("checkout") || "";
    const adults = parseInt(searchParams.get("adults") || "2");
    const children = parseInt(searchParams.get("children") || "0");

    const checkinDate = checkin ? new Date(checkin) : null;
    const checkoutDate = checkout ? new Date(checkout) : null;
    const nights =
        checkinDate && checkoutDate
            ? Math.ceil(
                (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24)
            )
            : 0;

    // Fetch availability for all villas
    const villaIds = useMemo(() => VILLAS.map((v) => v.id), []);
    const { isVillaAvailable, loading: availabilityLoading } =
        useAllVillasAvailability(villaIds);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Filter villas by guest count AND availability
    const availableVillas = VILLAS.filter((v) => {
        if (!v.isActive) return false;
        if (adults + children > v.maxGuests) return false;
        // Check calendar availability if we have dates
        if (checkinDate && checkoutDate) {
            return isVillaAvailable(v.id, checkinDate, checkoutDate);
        }
        return true;
    });

    const unavailableVillas = VILLAS.filter((v) => {
        if (!v.isActive) return false;
        if (adults + children > v.maxGuests) return false;
        if (checkinDate && checkoutDate) {
            return !isVillaAvailable(v.id, checkinDate, checkoutDate);
        }
        return false;
    });

    return (
        <div className="pt-28 pb-20 bg-neutral-50 min-h-screen">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Search Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-10">
                    <h1 className="text-2xl font-bold text-neutral-900 mb-4 font-[var(--font-outfit)]">
                        Available Villas
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 bg-neutral-50 rounded-lg px-4 py-2">
                            <CalendarDays className="h-4 w-4 text-amber-500" />
                            <span className="text-neutral-500">Check-in:</span>
                            <span className="font-semibold text-neutral-900">
                                {formatDate(checkin)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 rounded-lg px-4 py-2">
                            <CalendarDays className="h-4 w-4 text-amber-500" />
                            <span className="text-neutral-500">Check-out:</span>
                            <span className="font-semibold text-neutral-900">
                                {formatDate(checkout)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-50 rounded-lg px-4 py-2">
                            <Users className="h-4 w-4 text-amber-500" />
                            <span className="font-semibold text-neutral-900">
                                {adults} Adult{adults > 1 ? "s" : ""}
                            </span>
                        </div>
                        {children > 0 && (
                            <div className="flex items-center gap-2 bg-neutral-50 rounded-lg px-4 py-2">
                                <Baby className="h-4 w-4 text-amber-500" />
                                <span className="font-semibold text-neutral-900">
                                    {children} Child{children > 1 ? "ren" : ""}
                                </span>
                            </div>
                        )}
                        <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-700 border-amber-200 font-semibold"
                        >
                            {nights} Night{nights > 1 ? "s" : ""}
                        </Badge>
                    </div>
                </div>

                {/* Loading state */}
                {availabilityLoading && (
                    <div className="text-center py-8 mb-6">
                        <div className="inline-flex items-center gap-2 text-neutral-400 text-sm">
                            <div className="h-4 w-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                            Checking availability...
                        </div>
                    </div>
                )}

                {/* Available Results */}
                <div className="space-y-6">
                    {availableVillas.map((villa) => {
                        const pricing = calculatePrice(
                            villa.basePrice,
                            villa.addGuestPrice,
                            adults,
                            children,
                            nights
                        );

                        const addonsParams = new URLSearchParams({
                            villa: villa.slug,
                            checkin,
                            checkout,
                            adults: adults.toString(),
                            children: children.toString(),
                        });

                        return (
                            <div
                                key={villa.id}
                                className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    {/* Image */}
                                    <div className="relative w-full lg:w-80 h-56 lg:h-auto shrink-0">
                                        <Image
                                            src={villa.image}
                                            alt={villa.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div>
                                                    <h2 className="text-xl font-bold text-neutral-900 font-[var(--font-outfit)]">
                                                        {villa.name}
                                                    </h2>
                                                    <p className="text-sm text-amber-600 font-medium">
                                                        {villa.tagline}
                                                    </p>
                                                </div>
                                                <Badge className="bg-green-100 text-green-700 border-green-200 shrink-0">
                                                    Available
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-4 text-neutral-400 text-xs mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <BedDouble className="h-3.5 w-3.5" />
                                                    {villa.bedrooms} Beds
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Bath className="h-3.5 w-3.5" />
                                                    {villa.bathrooms} Baths
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="h-3.5 w-3.5" />
                                                    Max {villa.maxGuests}
                                                </div>
                                            </div>

                                            <Separator className="my-4" />

                                            {/* Price Breakdown */}
                                            <div className="space-y-1.5 text-sm">
                                                {pricing.breakdown.map((line, i) => (
                                                    <p key={i} className="text-neutral-500">
                                                        {line}
                                                    </p>
                                                ))}
                                                <p className="text-neutral-400 text-xs">
                                                    × {nights} night{nights > 1 ? "s" : ""}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between mt-6 pt-4 border-t border-neutral-100">
                                            <div>
                                                <p className="text-xs text-neutral-400 uppercase tracking-wider">
                                                    Total
                                                </p>
                                                <p className="text-2xl font-bold text-neutral-900">
                                                    {formatCurrency(pricing.grandTotal)}
                                                </p>
                                                <p className="text-xs text-neutral-400">
                                                    {formatCurrency(pricing.totalPerNight)}/night
                                                </p>
                                            </div>
                                            <Link href={`/addons?${addonsParams.toString()}`}>
                                                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold px-8 shadow-lg shadow-amber-500/20">
                                                    Book Now
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Unavailable villas (shown as greyed out) */}
                    {unavailableVillas.length > 0 && (
                        <>
                            <div className="flex items-center gap-3 mt-8 mb-4">
                                <Separator className="flex-1" />
                                <span className="text-xs text-neutral-400 uppercase tracking-wider whitespace-nowrap">
                                    Not Available for Selected Dates
                                </span>
                                <Separator className="flex-1" />
                            </div>

                            {unavailableVillas.map((villa) => (
                                <div
                                    key={villa.id}
                                    className="bg-white/60 rounded-2xl shadow-sm border border-neutral-100 overflow-hidden opacity-60"
                                >
                                    <div className="flex flex-col lg:flex-row">
                                        <div className="relative w-full lg:w-80 h-56 lg:h-auto shrink-0">
                                            <Image
                                                src={villa.image}
                                                alt={villa.name}
                                                fill
                                                className="object-cover grayscale"
                                            />
                                        </div>
                                        <div className="flex-1 p-6 lg:p-8">
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div>
                                                    <h2 className="text-xl font-bold text-neutral-900 font-[var(--font-outfit)]">
                                                        {villa.name}
                                                    </h2>
                                                    <p className="text-sm text-neutral-400 font-medium">
                                                        {villa.tagline}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant="secondary"
                                                    className="bg-red-50 text-red-600 border-red-200 shrink-0"
                                                >
                                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                                    Booked
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-neutral-400">
                                                This villa is not available for your selected dates. Try different dates to see availability.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    {/* No results at all */}
                    {availableVillas.length === 0 &&
                        unavailableVillas.length === 0 &&
                        !availabilityLoading && (
                            <div className="text-center py-16">
                                <p className="text-neutral-400 text-lg">
                                    No villas available for the selected guest count. Please adjust
                                    your search.
                                </p>
                                <Link href="/">
                                    <Button variant="outline" className="mt-4">
                                        Back to Home
                                    </Button>
                                </Link>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <div className="pt-28 pb-20 flex items-center justify-center min-h-screen">
                    <p className="text-neutral-400">Loading results...</p>
                </div>
            }
        >
            <SearchResults />
        </Suspense>
    );
}
