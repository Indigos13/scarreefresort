import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, type Villa } from "@/lib/constants";

interface VillaCardProps {
    villa: Villa;
}

export function VillaCard({ villa }: VillaCardProps) {
    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-neutral-100">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={villa.image}
                    alt={villa.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge className="absolute top-4 right-4 bg-amber-500/90 backdrop-blur-sm text-white border-0 font-semibold">
                    From {formatCurrency(villa.basePrice)}/night
                </Badge>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-amber-600 transition-colors">
                        {villa.name}
                    </h3>
                    <p className="text-sm text-amber-600 font-medium mt-1">
                        {villa.tagline}
                    </p>
                </div>

                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {villa.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-neutral-400">
                    <div className="flex items-center gap-1.5">
                        <BedDouble className="h-4 w-4" />
                        <span className="text-xs font-medium">
                            {villa.bedrooms} {villa.bedrooms > 1 ? "Beds" : "Bed"}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Bath className="h-4 w-4" />
                        <span className="text-xs font-medium">
                            {villa.bathrooms} {villa.bathrooms > 1 ? "Baths" : "Bath"}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span className="text-xs font-medium">
                            Up to {villa.maxGuests}
                        </span>
                    </div>
                </div>

                <Link href={`/villas/${villa.slug}`}>
                    <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-semibold mt-2">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}
