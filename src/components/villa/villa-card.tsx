import Image from "next/image";
import Link from "next/link";
import { Maximize2, Users } from "lucide-react";
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
                <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white border-0 font-semibold">
                    From {formatCurrency(villa.basePrice)}/night
                </Badge>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors">
                        {villa.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider mt-1">
                        {villa.subtitle}
                    </p>
                </div>

                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                    {villa.shortDescription}
                </p>

                {/* Pricing */}
                <div className="bg-neutral-50 rounded-lg p-3 space-y-1">
                    <p className="text-sm font-semibold text-neutral-900">
                        Starting from <span className="text-primary">{formatCurrency(villa.basePrice)}</span> <span className="text-xs text-neutral-400 font-normal">(first guest)</span>
                    </p>
                    <p className="text-xs text-neutral-500">
                        + {formatCurrency(villa.addGuestPrice)} <span className="text-primary font-semibold">{villa.discountPercent}</span> (× additional guest)
                    </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-neutral-400">
                    <div className="flex items-center gap-1.5">
                        <Maximize2 className="h-4 w-4" />
                        <span className="text-xs font-medium">
                            {villa.size}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        <span className="text-xs font-medium">
                            Up to {villa.maxGuests}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Link href="/booking" className="flex-1">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold mt-2">
                            BOOK NOW
                        </Button>
                    </Link>
                    <Link href={`/accommodation#${villa.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/5 font-semibold mt-2">
                            More Info
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

