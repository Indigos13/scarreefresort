import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    BedDouble,
    Bath,
    Users,
    Check,
    ArrowLeft,
    DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { VILLAS, formatCurrency, getVillaBySlug } from "@/lib/constants";
import { SearchWidget } from "@/components/booking/search-widget";

interface VillaPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return VILLAS.map((villa) => ({ slug: villa.slug }));
}

export async function generateMetadata({ params }: VillaPageProps) {
    const { slug } = await params;
    const villa = getVillaBySlug(slug);
    if (!villa) return { title: "Villa Not Found" };
    return {
        title: `${villa.name} — Scar Reef Resort`,
        description: villa.description,
    };
}

export default async function VillaDetailPage({ params }: VillaPageProps) {
    const { slug } = await params;
    const villa = getVillaBySlug(slug);
    if (!villa) notFound();

    const childPrice = villa.addGuestPrice * 0.5;

    return (
        <div className="pt-20">
            {/* Hero Gallery */}
            <div className="relative h-[50vh] lg:h-[60vh]">
                <Image
                    src={villa.image}
                    alt={villa.name}
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="absolute bottom-8 left-0 right-0 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <Link
                            href="/#villas"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Villas
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white font-[var(--font-outfit)]">
                            {villa.name}
                        </h1>
                        <p className="text-lg text-amber-300 font-medium mt-2">
                            {villa.tagline}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Details */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-neutral-50 rounded-xl px-5 py-3">
                                <BedDouble className="h-5 w-5 text-amber-500" />
                                <div>
                                    <p className="text-xs text-neutral-400">Bedrooms</p>
                                    <p className="font-bold text-neutral-900">
                                        {villa.bedrooms}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-neutral-50 rounded-xl px-5 py-3">
                                <Bath className="h-5 w-5 text-amber-500" />
                                <div>
                                    <p className="text-xs text-neutral-400">Bathrooms</p>
                                    <p className="font-bold text-neutral-900">
                                        {villa.bathrooms}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-neutral-50 rounded-xl px-5 py-3">
                                <Users className="h-5 w-5 text-amber-500" />
                                <div>
                                    <p className="text-xs text-neutral-400">Max Guests</p>
                                    <p className="font-bold text-neutral-900">
                                        {villa.maxGuests}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-[var(--font-outfit)]">
                                About This Villa
                            </h2>
                            <p className="text-neutral-600 leading-relaxed">
                                {villa.description}
                            </p>
                        </div>

                        <Separator />

                        {/* Amenities */}
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-[var(--font-outfit)]">
                                Amenities
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {villa.amenities.map((amenity) => (
                                    <div
                                        key={amenity}
                                        className="flex items-center gap-3 bg-neutral-50 rounded-xl px-4 py-3"
                                    >
                                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                                        <span className="text-sm text-neutral-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Gallery */}
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-[var(--font-outfit)]">
                                Gallery
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {villa.gallery.map((img, i) => (
                                    <div
                                        key={i}
                                        className="relative aspect-[4/3] rounded-xl overflow-hidden"
                                    >
                                        <Image
                                            src={img}
                                            alt={`${villa.name} view ${i + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Pricing Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 space-y-6">
                            <div>
                                <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-3">
                                    Pricing
                                </Badge>
                                <h3 className="text-2xl font-bold text-neutral-900 font-[var(--font-outfit)]">
                                    {formatCurrency(villa.basePrice)}
                                    <span className="text-sm font-normal text-neutral-400">
                                        /night
                                    </span>
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-neutral-500 flex items-center gap-2">
                                        <DollarSign className="h-3.5 w-3.5" />
                                        1st Guest
                                    </span>
                                    <span className="font-semibold text-neutral-900">
                                        {formatCurrency(villa.basePrice)}/night
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-neutral-500 flex items-center gap-2">
                                        <Users className="h-3.5 w-3.5" />
                                        Extra Adult
                                    </span>
                                    <span className="font-semibold text-neutral-900">
                                        +{formatCurrency(villa.addGuestPrice)}/night
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-neutral-500 flex items-center gap-2">
                                        <Users className="h-3.5 w-3.5" />
                                        Child (50%)
                                    </span>
                                    <span className="font-semibold text-neutral-900">
                                        +{formatCurrency(childPrice)}/night
                                    </span>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-4">
                                    Check Availability
                                </p>
                                <SearchWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
