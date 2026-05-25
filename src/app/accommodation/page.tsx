import Image from "next/image";
import Link from "next/link";
import { Check, Users, Maximize2, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VILLAS, formatCurrency } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accommodation - Scar Reef Resort",
  description:
    "From double rooms to private villas, find your perfect Scar Reef Resort accommodation and enjoy tropical-style luxury with all the comfort you need.",
};

export default function AccommodationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/resort-overview.jpg"
          alt="Scar Reef Resort Accommodation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[var(--font-outfit)] uppercase tracking-wide">
            Our Accommodations
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto text-lg">
            From double rooms to private villas, find your perfect Scar Reef
            Resort accommodation and enjoy tropical-style luxury with all the
            comfort you need.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            All Accommodation Include Services (Half-Board)
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-6">
            All our accommodations are equipped with hot water and air
            conditioning. Find all your globe-trotting creature comforts in our
            beautiful rooms and villas.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-amber-800">
              <strong>Min. stay:</strong> 2 nights
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-amber-800">
              <strong>Children:</strong> Ages 6+ only
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-amber-800">
              <strong>High Season (Jun 15 – Sep 15):</strong> Full payment
              required
            </div>
          </div>
        </div>
      </section>

      {/* Villa Listings */}
      {VILLAS.map((villa, index) => (
        <section
          key={villa.id}
          id={villa.slug}
          className={`py-20 ${index % 2 === 0 ? "bg-neutral-50" : "bg-white"}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                index % 2 !== 0 ? "lg:[direction:rtl] lg:*:[direction:ltr]" : ""
              }`}
            >
              {/* Gallery */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src={villa.image}
                    alt={villa.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {villa.gallery.slice(0, 4).map((img, i) => (
                    <div
                      key={i}
                      className="relative rounded-lg overflow-hidden aspect-square"
                    >
                      <Image
                        src={img}
                        alt={`${villa.name} - ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900 font-[var(--font-outfit)]">
                    {villa.name}
                  </h2>
                  <p className="text-primary text-sm font-semibold uppercase tracking-wider mt-1">
                    {villa.subtitle}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-neutral-100 rounded-lg px-4 py-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      {villa.maxGuests} guests
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-100 rounded-lg px-4 py-2">
                    <Maximize2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{villa.size}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-100 rounded-lg px-4 py-2">
                    <Moon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      Min. {villa.minNights} nights
                    </span>
                  </div>
                </div>

                <p className="text-neutral-600 leading-relaxed">
                  {villa.description}
                </p>

                {/* Pricing */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="font-bold text-neutral-900 mb-3">Pricing</h3>
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(villa.basePrice)}{" "}
                      <span className="text-sm text-neutral-500 font-normal">
                        (first guest / night)
                      </span>
                    </p>
                    <p className="text-sm text-neutral-600">
                      + {formatCurrency(villa.addGuestPrice)}{" "}
                      <span className="text-primary font-semibold">
                        {villa.discountPercent}
                      </span>{" "}
                      per additional guest
                    </p>
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h3 className="font-bold text-neutral-900 mb-3">Equipment</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {villa.equipment.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm text-neutral-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusive Package */}
                <div>
                  <h3 className="font-bold text-neutral-900 mb-3">
                    Inclusive Package
                  </h3>
                  <div className="space-y-2">
                    {villa.inclusivePackage.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm text-neutral-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-10 w-full sm:w-auto"
                  >
                    BOOK NOW
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
