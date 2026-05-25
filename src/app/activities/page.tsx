import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACTIVITIES } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities - Scar Reef Resort",
  description:
    "Discover exciting activities at our eco resort in Sumbawa: surf, snorkeling, foiling, yoga, fishing, and more. Start your adventure today!",
};

const categoryLabels: Record<string, { label: string; emoji: string }> = {
  surf: { label: "Surf & Rides", emoji: "🏄" },
  water: { label: "Water Activities", emoji: "🌊" },
  adventure: { label: "Adventure", emoji: "🎣" },
  leisure: { label: "Leisure", emoji: "🎾" },
  wellness: { label: "Wellness", emoji: "🧘" },
};

export default function ActivitiesPage() {
  const categories = [...new Set(ACTIVITIES.map((a) => a.category))];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-neutral-900 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-outfit)] uppercase tracking-wide">
            Activities
          </h1>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto text-lg">
            Whether you&apos;ve come to Scar Reef Resort to unwind by the beach or
            you&apos;re an insatiable rider chasing endless surf and foil sessions,
            our curated activities are the perfect addition to your stay.
          </p>
        </div>
      </section>

      {/* Activities by Category */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {categories.map((cat) => {
            const catInfo = categoryLabels[cat] || {
              label: cat,
              emoji: "📋",
            };
            const items = ACTIVITIES.filter((a) => a.category === cat);

            return (
              <div key={cat} className="mb-12 last:mb-0">
                <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3 font-[var(--font-outfit)]">
                  <span className="text-2xl">{catInfo.emoji}</span>
                  {catInfo.label}
                </h2>
                <div className="space-y-3">
                  {items.map((activity) => (
                    <div
                      key={activity.name}
                      className="flex items-center justify-between bg-neutral-50 rounded-xl p-5 border border-neutral-100 hover:border-primary/20 transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold text-neutral-900">
                          {activity.name}
                        </h3>
                        <p className="text-sm text-neutral-500 mt-0.5">
                          {activity.unit}
                          {activity.note && (
                            <span className="text-primary ml-2">
                              ({activity.note})
                            </span>
                          )}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-4 py-1.5 shrink-0">
                        Book on reception
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-[var(--font-outfit)]">
            Ready for Your Adventure?
          </h2>
          <p className="text-neutral-600 mb-6">
            All activities can be booked at reception. For surf and foil
            packages, we recommend pre-booking to secure your spot.
          </p>
          <Link href="/booking">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6">
              Book Your Stay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
