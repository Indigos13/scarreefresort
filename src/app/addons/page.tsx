"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Users,
    Baby,
    CreditCard,
    Check,
    Car,
    Waves,
    MapPin,
    Calendar,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    getVillaBySlug,
    calculatePrice,
    formatCurrency,
} from "@/lib/constants";
import { ADDON_CATEGORIES } from "@/lib/addons";

function AddonsSelector() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const villaSlug = searchParams.get("villa") || "";
    const checkin = searchParams.get("checkin") || "";
    const checkout = searchParams.get("checkout") || "";
    const adults = parseInt(searchParams.get("adults") || "2");
    const children = parseInt(searchParams.get("children") || "0");

    const villa = getVillaBySlug(villaSlug);

    // Form State
    const [needsTransport, setNeedsTransport] = useState(false);
    const [transportArrival, setTransportArrival] = useState("arr-none");
    const [transportReturn, setTransportReturn] = useState("ret-none");
    const [arrivalDate, setArrivalDate] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [transportGuests, setTransportGuests] = useState((adults + children).toString());

    const [needsSurfGuide, setNeedsSurfGuide] = useState(false);
    const [needsSnorkeling, setNeedsSnorkeling] = useState(false);
    const [snorkelingType, setSnorkelingType] = useState("snork-jel-yes");

    if (!villa) {
        return (
            <div className="pt-28 pb-20 flex flex-col items-center justify-center min-h-screen">
                <p className="text-neutral-400 text-lg mb-4">Villa not found.</p>
                <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                </Link>
            </div>
        );
    }

    const checkinDate = checkin ? new Date(checkin) : null;
    const checkoutDate = checkout ? new Date(checkout) : null;
    const nights =
        checkinDate && checkoutDate
            ? Math.ceil(
                (checkoutDate.getTime() - checkinDate.getTime()) /
                (1000 * 60 * 60 * 24)
            )
            : 0;

    const pricing = calculatePrice(
        villa.basePrice,
        villa.addGuestPrice,
        adults,
        children,
        nights
    );

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const arrivalOptions = ADDON_CATEGORIES.find(c => c.id === "transport-arrival")?.options || [];
    const returnOptions = ADDON_CATEGORIES.find(c => c.id === "transport-return")?.options || [];

    // Calculate selected add-ons for summary
    const selectedAddons = useMemo(() => {
        const addons: { label: string; price: number; details?: string }[] = [];

        if (needsTransport) {
            const arrOpt = arrivalOptions.find(o => o.id === transportArrival);
            if (arrOpt && arrOpt.price > 0) {
                addons.push({ 
                    label: `Arrival: ${arrOpt.label}`, 
                    price: arrOpt.price,
                    details: `Date: ${arrivalDate} ${arrivalTime} | Guests: ${transportGuests}`
                });
            }
            
            const retOpt = returnOptions.find(o => o.id === transportReturn);
            if (retOpt && retOpt.price > 0) {
                addons.push({ label: `Return: ${retOpt.label}`, price: retOpt.price });
            }
        }

        if (needsSurfGuide) {
            addons.push({ label: "Surf Guide (Guide + Board)", price: 720 });
        }

        if (needsSnorkeling) {
            const snorkOpt = snorkelingType === "snork-jel-yes" 
                ? { label: "Snorkeling (2H) Jelenga Bay", price: 50 }
                : { label: "Snorkeling (2H) Outside Jelenga Bay", price: 100 };
            addons.push(snorkOpt);
        }

        return addons;
    }, [needsTransport, transportArrival, transportReturn, arrivalDate, arrivalTime, transportGuests, needsSurfGuide, needsSnorkeling, snorkelingType, arrivalOptions, returnOptions]);

    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const grandTotalWithAddons = pricing.grandTotal + addonsTotal;

    const handleContinue = () => {
        const params = new URLSearchParams({
            villa: villaSlug,
            checkin,
            checkout,
            adults: adults.toString(),
            children: children.toString(),
        });

        if (selectedAddons.length > 0) {
            params.set("addons", JSON.stringify(selectedAddons));
        }

        router.push(`/booking?${params.toString()}`);
    };

    return (
        <div className="pt-28 pb-20 bg-neutral-50 min-h-screen">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href={`/search?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`}
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 text-sm mb-8 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to search results
                </Link>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-2 mb-10">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/50 text-white flex items-center justify-center text-sm font-bold">
                            <Check className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-primary">Select Villa</span>
                    </div>
                    <div className="w-8 h-px bg-primary" />
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/50 text-white flex items-center justify-center text-sm font-bold">
                            2
                        </div>
                        <span className="text-sm font-bold text-primary">Add-ons</span>
                    </div>
                    <div className="w-8 h-px bg-neutral-300" />
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center text-sm font-bold">
                            3
                        </div>
                        <span className="text-sm text-neutral-400">Checkout</span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-neutral-900 mb-2 font-[var(--font-outfit)]">
                    Enhance Your Stay
                </h1>
                <p className="text-neutral-500 mb-8">
                    Add transport, activities, and extras to make your trip unforgettable.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left: Add-on Form */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* 1. Transport arrangements */}
                        <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-1">
                                        <Car className="h-5 w-5 text-primary" />
                                        Airport Transfer & Transport
                                    </h3>
                                    <p className="text-sm text-neutral-500">
                                        Would you like us to arrange a driver/transfer for you to and from West Sumbawa?
                                    </p>
                                </div>
                                <Switch 
                                    checked={needsTransport} 
                                    onCheckedChange={setNeedsTransport} 
                                />
                            </div>

                            {needsTransport && (
                                <div className="space-y-6 animate-fade-in pt-4 border-t border-neutral-100">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-semibold text-neutral-900">Arrival Pick-up</h4>
                                        <div className="space-y-3">
                                            <Label className="text-neutral-600">From where?</Label>
                                            <select 
                                                className="w-full h-11 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                value={transportArrival}
                                                onChange={(e) => setTransportArrival(e.target.value)}
                                            >
                                                {arrivalOptions.map(opt => (
                                                    <option key={opt.id} value={opt.id}>
                                                        {opt.label} {opt.price > 0 ? `(${formatCurrency(opt.price)})` : ""}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        {transportArrival !== "arr-none" && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-neutral-600 flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Date</Label>
                                                    <Input type="date" value={arrivalDate} onChange={e => setArrivalDate(e.target.value)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-neutral-600 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Time</Label>
                                                    <Input type="time" value={arrivalTime} onChange={e => setArrivalTime(e.target.value)} />
                                                </div>
                                                <div className="space-y-2 col-span-2">
                                                    <Label className="text-neutral-600 flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Number of Guests</Label>
                                                    <Input type="number" min="1" value={transportGuests} onChange={e => setTransportGuests(e.target.value)} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-4 pt-4 border-t border-neutral-100">
                                        <h4 className="text-sm font-semibold text-neutral-900">Departure Drop-off</h4>
                                        <div className="space-y-3">
                                            <Label className="text-neutral-600">To where?</Label>
                                            <select 
                                                className="w-full h-11 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                value={transportReturn}
                                                onChange={(e) => setTransportReturn(e.target.value)}
                                            >
                                                {returnOptions.map(opt => (
                                                    <option key={opt.id} value={opt.id}>
                                                        {opt.label} {opt.price > 0 ? `(${formatCurrency(opt.price)})` : ""}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 2. Surf & Adventure */}
                        <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-1">
                                        <Waves className="h-5 w-5 text-primary" />
                                        Surf Guide & Board Rental
                                    </h3>
                                    <p className="text-sm text-neutral-500">
                                        Need a local expert to guide you to the best reef breaks and provide a board?
                                    </p>
                                </div>
                                <Switch 
                                    checked={needsSurfGuide} 
                                    onCheckedChange={setNeedsSurfGuide} 
                                />
                            </div>
                        </div>

                        {/* 3. Snorkeling */}
                        <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-1">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        Snorkeling Experience
                                    </h3>
                                    <p className="text-sm text-neutral-500">
                                        Would you like to explore the vibrant underwater world of West Sumbawa?
                                    </p>
                                </div>
                                <Switch 
                                    checked={needsSnorkeling} 
                                    onCheckedChange={setNeedsSnorkeling} 
                                />
                            </div>

                            {needsSnorkeling && (
                                <div className="space-y-4 animate-fade-in pt-4 border-t border-neutral-100">
                                    <Label className="text-neutral-600">Select Location</Label>
                                    <select 
                                        className="w-full h-11 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={snorkelingType}
                                        onChange={(e) => setSnorkelingType(e.target.value)}
                                    >
                                        <option value="snork-jel-yes">Jelenga Bay (2 Hours) - $50</option>
                                        <option value="snork-out-yes">Outside Jelenga Bay (2 Hours) - $100</option>
                                    </select>
                                    <p className="text-xs text-neutral-400">* Minimum 2 persons required for snorkeling trips.</p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right: Price Summary Sidebar */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-28 space-y-6">
                            {/* Villa Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
                                <div className="relative w-full h-40">
                                    <Image
                                        src={villa.image}
                                        alt={villa.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-neutral-900">
                                        {villa.name}
                                    </h3>
                                    <p className="text-xs text-primary mb-2">
                                        {villa.tagline}
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-xs text-neutral-400">
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="h-3 w-3" />
                                            {formatDate(checkin)} → {formatDate(checkout)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            {adults} Adult{adults > 1 ? "s" : ""}
                                        </span>
                                        {children > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Baby className="h-3 w-3" />
                                                {children} Child
                                                {children > 1 ? "ren" : ""}
                                            </span>
                                        )}
                                        <Badge
                                            variant="secondary"
                                            className="bg-primary/10 text-primary border-primary/20 text-[10px] px-2 py-0"
                                        >
                                            {nights} Night{nights > 1 ? "s" : ""}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 space-y-4">
                                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                    Price Summary
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">
                                            Villa ({nights} night
                                            {nights > 1 ? "s" : ""})
                                        </span>
                                        <span className="font-semibold text-neutral-900">
                                            {formatCurrency(pricing.grandTotal)}
                                        </span>
                                    </div>

                                    {selectedAddons.length > 0 && (
                                        <>
                                            <Separator className="my-2" />
                                            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                                                Add-ons
                                            </p>
                                            {selectedAddons.map((addon, i) => (
                                                <div
                                                    key={i}
                                                    className="flex justify-between"
                                                >
                                                    <span className="text-neutral-500 truncate mr-3">
                                                        {addon.label}
                                                    </span>
                                                    <span className="font-semibold text-neutral-900 whitespace-nowrap">
                                                        {formatCurrency(addon.price)}
                                                    </span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>

                                <Separator />

                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-neutral-900 text-lg">
                                        Total
                                    </span>
                                    <span className="font-bold text-2xl text-neutral-900">
                                        {formatCurrency(grandTotalWithAddons)}
                                    </span>
                                </div>

                                <Button
                                    onClick={handleContinue}
                                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/25"
                                >
                                    Continue to Checkout
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                <p className="text-center text-xs text-neutral-400">
                                    You can also skip add-ons and proceed directly
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AddonsPage() {
    return (
        <Suspense
            fallback={
                <div className="pt-28 pb-20 flex items-center justify-center min-h-screen">
                    <p className="text-neutral-400">Loading add-ons...</p>
                </div>
            }
        >
            <AddonsSelector />
        </Suspense>
    );
}
