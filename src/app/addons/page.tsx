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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    getVillaBySlug,
    calculatePrice,
    formatCurrency,
} from "@/lib/constants";
import { ADDON_CATEGORIES, type AddonOption } from "@/lib/addons";

function AddonsSelector() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const villaSlug = searchParams.get("villa") || "";
    const checkin = searchParams.get("checkin") || "";
    const checkout = searchParams.get("checkout") || "";
    const adults = parseInt(searchParams.get("adults") || "2");
    const children = parseInt(searchParams.get("children") || "0");

    const villa = getVillaBySlug(villaSlug);

    // Track selected option per category (default to the first/free option)
    const [selections, setSelections] = useState<Record<string, string>>(() => {
        const defaults: Record<string, string> = {};
        ADDON_CATEGORIES.forEach((cat) => {
            defaults[cat.id] = cat.options[0].id;
        });
        return defaults;
    });

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

    // Calculate total add-on costs
    const selectedAddons = useMemo(() => {
        const addons: { label: string; price: number; categoryTitle: string }[] = [];
        ADDON_CATEGORIES.forEach((cat) => {
            const selectedId = selections[cat.id];
            const option = cat.options.find((o) => o.id === selectedId);
            if (option && option.price > 0) {
                addons.push({
                    label: option.emoji
                        ? `${option.emoji} ${option.label}`
                        : option.label,
                    price: option.price,
                    categoryTitle: cat.title,
                });
            }
        });
        return addons;
    }, [selections]);

    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const grandTotalWithAddons = pricing.grandTotal + addonsTotal;

    const handleSelect = (categoryId: string, optionId: string) => {
        setSelections((prev) => ({ ...prev, [categoryId]: optionId }));
    };

    const handleContinue = () => {
        // Build addons query param as JSON
        const addonParams = selectedAddons.map((a) => ({
            label: a.label,
            price: a.price,
        }));

        const params = new URLSearchParams({
            villa: villaSlug,
            checkin,
            checkout,
            adults: adults.toString(),
            children: children.toString(),
        });

        if (addonParams.length > 0) {
            params.set("addons", JSON.stringify(addonParams));
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
                        <div className="h-8 w-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
                            <Check className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-amber-600">Select Villa</span>
                    </div>
                    <div className="w-8 h-px bg-amber-400" />
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
                            2
                        </div>
                        <span className="text-sm font-bold text-amber-600">Add-ons</span>
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
                    {/* Left: Add-on Categories */}
                    <div className="lg:col-span-3 space-y-6">
                        {ADDON_CATEGORIES.map((category) => (
                            <div
                                key={category.id}
                                className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm"
                            >
                                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">{category.emoji}</span>
                                    {category.title}
                                </h3>

                                <div className="space-y-2">
                                    {category.options.map((option) => {
                                        const isSelected =
                                            selections[category.id] === option.id;
                                        return (
                                            <label
                                                key={option.id}
                                                className={`flex items-center justify-between gap-3 p-3.5 rounded-xl cursor-pointer transition-all duration-200 border ${isSelected
                                                    ? "border-amber-400 bg-amber-50/60 shadow-sm"
                                                    : "border-transparent bg-neutral-50 hover:bg-neutral-100"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected
                                                            ? "border-amber-500 bg-amber-500"
                                                            : "border-neutral-300"
                                                            }`}
                                                    >
                                                        {isSelected && (
                                                            <div className="h-2 w-2 rounded-full bg-white" />
                                                        )}
                                                    </div>
                                                    <span
                                                        className={`text-sm ${isSelected
                                                            ? "font-semibold text-neutral-900"
                                                            : "text-neutral-600"
                                                            }`}
                                                    >
                                                        {option.emoji && (
                                                            <span className="mr-1.5">
                                                                {option.emoji}
                                                            </span>
                                                        )}
                                                        {option.label}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`text-sm font-semibold whitespace-nowrap ${option.price === 0
                                                        ? "text-green-600"
                                                        : isSelected
                                                            ? "text-amber-600"
                                                            : "text-neutral-500"
                                                        }`}
                                                >
                                                    {option.price === 0
                                                        ? "Free"
                                                        : formatCurrency(option.price)}
                                                </span>
                                                <input
                                                    type="radio"
                                                    name={category.id}
                                                    value={option.id}
                                                    checked={isSelected}
                                                    onChange={() =>
                                                        handleSelect(category.id, option.id)
                                                    }
                                                    className="sr-only"
                                                />
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
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
                                    <p className="text-xs text-amber-600 mb-2">
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
                                            className="bg-amber-100 text-amber-700 border-amber-200 text-[10px] px-2 py-0"
                                        >
                                            {nights} Night{nights > 1 ? "s" : ""}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 space-y-4">
                                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-amber-500" />
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
                                    className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-base shadow-lg shadow-amber-500/25"
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
