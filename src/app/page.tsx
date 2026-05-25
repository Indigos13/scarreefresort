import Image from "next/image";
import {
  Waves,
  Utensils,
  Compass,
  Star,
  ArrowRight,
  Play,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VILLAS, SITE_CONFIG, TESTIMONIALS } from "@/lib/constants";
import { VillaCard } from "@/components/villa/villa-card";
import { SearchWidget } from "@/components/booking/search-widget";
import Link from "next/link";

const sections = [
  {
    icon: Waves,
    title: "Accommodations",
    description:
      "Tropical Island living at its finest. From luxury private villas to gorgeous fully appointed bedrooms, our island-style rooms are bound to make you want to stay forever.",
    image: "/images/resort-overview.jpg",
    href: "/accommodation",
  },
  {
    icon: Utensils,
    title: "Restaurant",
    description:
      "Our healthy, energizing and delicious food will have you covered from breakfast to dinner. Chose from our extensive menu made of fresh food with natural hand-picked ingredients from our permaculture garden.",
    image: "/images/restaurant-food.jpg",
    href: "/restaurant",
  },
  {
    icon: Compass,
    title: "Experience",
    description:
      "Scar Reef Resort is the perfect place for a remote nature experience. A surfer's dream with empty lineups right out front. Join us for a fun packed island adventure in and out of the water.",
    image: "/images/activities-overview.jpg",
    href: "/experience",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video / Image */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/resort-overview.jpg"
        >
          <source src={SITE_CONFIG.videoUrl} type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            {/* Promo badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-5 py-2 mb-6">
              <span className="text-primary text-sm font-semibold">
                {SITE_CONFIG.promo}
              </span>
            </div>

            <p className="text-white/80 text-sm font-semibold uppercase tracking-[0.3em] mb-4 drop-shadow-sm">
              WEST SUMBAWA
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-[var(--font-outfit)] drop-shadow-md uppercase tracking-wide">
              Paradise
              <span className="block text-primary">Surf-Resort</span>
            </h1>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Link href="/booking">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-base px-8 py-6 shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all"
                >
                  CHECK AVAILABILITY
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Booking Widget */}
          <div id="booking" className="pb-8">
            <SearchWidget />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-primary/60 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== ECO-RESORT INTRO ===== */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.3em] mb-4">
            &#59; Paradise Eco-Resort in West Sumbawa
          </p>
          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            {SITE_CONFIG.description}
          </p>
        </div>
      </section>

      {/* ===== THREE PILLARS: ACCOMMODATION, RESTAURANT, EXPERIENCE ===== */}
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sections.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] flex items-end"
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 p-8 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                    {section.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                    LEARN MORE <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ACCOMMODATIONS SECTION ===== */}
      <section id="accommodation" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Accommodations
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 font-[var(--font-outfit)]">
              Our Beachfront Accommodations
            </h2>
            <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
              Our beachfront accommodations are a place to call home. Find all
              your globe-trotting creature comforts in our beautiful rooms and
              villas. All our accommodations are equipped with hot water and air
              conditioning.
            </p>
          </div>

          {/* High season notice */}
          <div className="max-w-2xl mx-auto mb-12 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <p className="text-sm text-amber-800">
              <strong>High Season (June 15 – September 15):</strong> We only
              take reservations with one of our exclusive packages. All bookings
              are confirmed only with full payment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VILLAS.map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCE SECTION ===== */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Experience
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-outfit)]">
              A Remote Nature Experience
            </h2>
          </div>
          <p className="text-neutral-400 max-w-3xl mx-auto text-center mb-16 leading-relaxed">
            Sumbawa is the perfect place for a remote nature experience. Scar
            Reef Resort should be at the top of your surfing bucket-list:
            experience Indonesia&apos;s finest waves without the crowds. Scar Reef
            and the other beautiful breaks out front offer the best surfing
            conditions from beginner to advanced. Our resort is suitable for any
            types of travelers: from globe trotters to families, our white sandy
            beach borders a calm lagoon teeming with wildlife: expect to
            encounter beautiful tropical fish, turtles, manta rays and the
            dugongs that live nearby.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <span className="text-3xl mb-4 block">🏄</span>
              <h3 className="text-xl font-bold mb-3">World-Class Surf</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Scar Reef is a world class wave with barrels that take off like a
                freight train. Fun and perfect for beginners at 2-3ft most days.
                Our boats shuttle you to the lineup.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <span className="text-3xl mb-4 block">🐢</span>
              <h3 className="text-xl font-bold mb-3">Marine Life</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Expect great snorkeling and fishing. Encounter beautiful tropical
                fish, turtles, manta rays and the dugongs that live nearby in the
                crystal-clear lagoon.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <span className="text-3xl mb-4 block">🌄</span>
              <h3 className="text-xl font-bold mb-3">Adventure & Trekking</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Amazing trekking paths surround our resort. We&apos;ll take you to
                the top for a sunset or sunrise to cherish for the rest of your
                life.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <span className="text-3xl mb-4 block">🧘</span>
              <h3 className="text-xl font-bold mb-3">Yoga & Wellness</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Our premium yoga shala faces the turquoise lagoon — the perfect
                place to unwind. In-house massage sessions available in our
                private massage shala.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/experience">
              <Button
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary hover:text-white px-8 py-6 font-semibold"
              >
                Discover All Experiences
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              Guest Reviews
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 font-[var(--font-outfit)]">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((review) => (
              <div
                key={review.name}
                className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-neutral-900">{review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GETTING HERE TEASER ===== */}
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                Getting Here
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 font-[var(--font-outfit)] mb-6">
                Hard to Find, But Hard to Forget
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-8">
                We like to say that Scar Reef Resort is hard to find, but hard to
                forget. It is not directly accessible like well known tourist
                spots but that is exactly what keeps the place quiet and
                exclusive. However, the trip here is smooth, beautiful and
                relatively quick.
              </p>
              <Link href="/getting-here">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 shadow-lg shadow-primary/20">
                  <MapPin className="mr-2 h-4 w-4" />
                  GET ME HERE
                </Button>
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/location-map.jpg"
                alt="Scar Reef Resort location map"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
