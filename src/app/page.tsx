import Image from "next/image";
import {
  Waves,
  Shield,
  Sparkles,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VILLAS, SITE_CONFIG } from "@/lib/constants";
import { VillaCard } from "@/components/villa/villa-card";
import { SearchWidget } from "@/components/booking/search-widget";
import Link from "next/link";

const features = [
  {
    icon: Waves,
    title: "Beachfront Location",
    description:
      "Steps from pristine white sand beaches with crystal clear waters and world-class surf breaks.",
  },
  {
    icon: Shield,
    title: "Complete Privacy",
    description:
      "Each villa is secluded within tropical gardens, offering the ultimate private retreat experience.",
  },
  {
    icon: Sparkles,
    title: "Luxury Experience",
    description:
      "Premium amenities, daily housekeeping, and personalized concierge service for every guest.",
  },
  {
    icon: MapPin,
    title: "Unspoiled Paradise",
    description:
      "Located on Sumba Island — one of Indonesia's last untouched frontiers of natural beauty.",
  },
];

const testimonials = [
  {
    name: "Sarah & James",
    location: "Melbourne, Australia",
    rating: 5,
    text: "Absolutely magical. The Beach House was beyond our wildest dreams. Waking up to the sound of waves and having the beach to ourselves was pure paradise.",
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    text: "Scar Reef Villa is a surfer's dream. The view of the reef break from the infinity pool is unreal. We've already booked our return trip.",
  },
  {
    name: "Emma & Tom",
    location: "London, UK",
    rating: 5,
    text: "The perfect family getaway. The kids loved the pool and beach, while we enjoyed the stunning sunsets from our private terrace. Can't recommend it enough!",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/hero.png"
          alt="Scar Reef Resort aerial view"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <p className="text-amber-300 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
              Welcome to Paradise
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-[var(--font-outfit)]">
              Scar Reef
              <span className="block text-amber-300">Resort</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Three exclusive beachfront villas on the pristine shores of Sumba
              Island. Your private sanctuary where luxury meets untouched
              natural beauty.
            </p>
          </div>

          {/* Booking Widget */}
          <div id="booking" className="pb-8">
            <SearchWidget />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-white/60 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== VILLAS SECTION ===== */}
      <section id="villas" className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Our Accommodations
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 font-[var(--font-outfit)]">
              Discover Our Villas
            </h2>
            <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
              Each of our three exclusive villas offers a unique experience,
              from intimate garden retreats to beachfront paradises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VILLAS.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section id="about" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Why Scar Reef
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 font-[var(--font-outfit)]">
              An Experience Like No Other
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-2xl bg-neutral-50 hover:bg-amber-50 border border-neutral-100 hover:border-amber-200 transition-all duration-300 group"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/30 transition-shadow">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-neutral-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Guest Reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-outfit)]">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((review) => (
              <div
                key={review.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-xs text-white/40">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section id="contact" className="relative py-24 overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Beach view"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-[var(--font-outfit)]">
            Ready for Paradise?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Book your exclusive beachfront villa today and create memories that
            will last a lifetime.
          </p>
          <Link href="/#booking">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-lg px-10 py-6 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all"
            >
              Book Your Stay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
