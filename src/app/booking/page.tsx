"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    CalendarDays,
    Users,
    Baby,
    CreditCard,
    Mail,
    Phone,
    User,
    ArrowLeft,
    Shield,
    CheckCircle2,
    Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    getVillaBySlug,
    calculatePrice,
    formatCurrency,
} from "@/lib/constants";

function BookingForm() {
    const searchParams = useSearchParams();
    const villaSlug = searchParams.get("villa") || "";
    const checkin = searchParams.get("checkin") || "";
    const checkout = searchParams.get("checkout") || "";
    const adults = parseInt(searchParams.get("adults") || "2");
    const children = parseInt(searchParams.get("children") || "0");
    const addonsRaw = searchParams.get("addons");

    const villa = getVillaBySlug(villaSlug);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [agreed, setAgreed] = useState(false);

    const addons = useMemo(() => {
        if (!addonsRaw) return [];
        try {
            return JSON.parse(addonsRaw) as { label: string; price: number }[];
        } catch {
            return [];
        }
    }, [addonsRaw]);

    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);

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

    const canSubmit = name && email && phone && agreed;

    const addonsParams = new URLSearchParams({
        villa: villaSlug,
        checkin,
        checkout,
        adults: adults.toString(),
        children: children.toString(),
    });

    return (
        <div className="pt-28 pb-20 bg-neutral-50 min-h-screen">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href={`/addons?${addonsParams.toString()}`}
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 text-sm mb-8 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to add-ons
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
                            <Check className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-amber-600">Add-ons</span>
                    </div>
                    <div className="w-8 h-px bg-amber-400" />
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
                            3
                        </div>
                        <span className="text-sm font-bold text-amber-600">Checkout</span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-neutral-900 mb-8 font-[var(--font-outfit)]">
                    Complete Your Booking
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left: Guest Form */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Villa Summary */}
                        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                            <div className="flex gap-4">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={villa.image}
                                        alt={villa.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h2 className="font-bold text-neutral-900 text-lg">
                                        {villa.name}
                                    </h2>
                                    <p className="text-sm text-amber-600">{villa.tagline}</p>
                                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-neutral-400">
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="h-3.5 w-3.5" />
                                            {formatDate(checkin)} → {formatDate(checkout)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3.5 w-3.5" />
                                            {adults} Adult{adults > 1 ? "s" : ""}
                                        </span>
                                        {children > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Baby className="h-3.5 w-3.5" />
                                                {children} Child{children > 1 ? "ren" : ""}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Guest Details */}
                        <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-5">
                            <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                                <User className="h-5 w-5 text-amber-500" />
                                Guest Information
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-neutral-700">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-neutral-700">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-12 pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-neutral-700">
                                        Phone Number
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+62 812 3456 7890"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-12 pl-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="mt-1 h-4 w-4 rounded border-neutral-300 text-amber-500 focus:ring-amber-500"
                                />
                                <span className="text-sm text-neutral-600">
                                    I agree to the{" "}
                                    <span className="text-amber-600 underline">
                                        terms and conditions
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-amber-600 underline">
                                        cancellation policy
                                    </span>
                                    . I understand that my booking will be confirmed upon
                                    successful payment.
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Right: Price Summary */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-28 bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 space-y-5">
                            <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-amber-500" />
                                Price Summary
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-neutral-500">
                                        1st guest × {nights} nights
                                    </span>
                                    <span className="font-semibold text-neutral-900">
                                        {formatCurrency(pricing.firstGuestTotal)}
                                    </span>
                                </div>
                                {adults > 1 && (
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">
                                            {adults - 1} extra adult{adults > 2 ? "s" : ""} × {nights}{" "}
                                            nights
                                        </span>
                                        <span className="font-semibold text-neutral-900">
                                            {formatCurrency(pricing.extraAdultsTotal)}
                                        </span>
                                    </div>
                                )}
                                {children > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-neutral-500">
                                            {children} child{children > 1 ? "ren" : ""} × {nights}{" "}
                                            nights
                                        </span>
                                        <span className="font-semibold text-neutral-900">
                                            {formatCurrency(pricing.childrenTotal)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {addons.length > 0 && (
                                <>
                                    <Separator />
                                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                                        Add-ons
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        {addons.map((addon, i) => (
                                            <div key={i} className="flex justify-between">
                                                <span className="text-neutral-500 truncate mr-3">
                                                    {addon.label}
                                                </span>
                                                <span className="font-semibold text-neutral-900 whitespace-nowrap">
                                                    {formatCurrency(addon.price)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            <Separator />

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-neutral-900 text-lg">
                                    Total
                                </span>
                                <span className="font-bold text-2xl text-neutral-900">
                                    {formatCurrency(pricing.grandTotal + addonsTotal)}
                                </span>
                            </div>

                            <Button
                                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-base shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!canSubmit}
                            >
                                Proceed to Payment
                            </Button>

                            <div className="flex items-center gap-2 justify-center text-xs text-neutral-400">
                                <Shield className="h-3.5 w-3.5" />
                                <span>Secure payment via Xendit</span>
                            </div>

                            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                                    <div className="text-xs text-green-700">
                                        <p className="font-semibold">Free cancellation</p>
                                        <p>
                                            Cancel up to 48 hours before check-in for a full refund.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense
            fallback={
                <div className="pt-28 pb-20 flex items-center justify-center min-h-screen">
                    <p className="text-neutral-400">Loading booking details...</p>
                </div>
            }
        >
            <BookingForm />
        </Suspense>
    );
}
