import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience - Scar Reef Resort",
  description:
    "Come and join us for a fun filled holiday! Beyond surfing, Scar Reef Resort offers a wide range of activities such as stand-up paddle, yoga, snorkeling, chilling on the beach, hiking and excursions.",
};

const experiences = [
  {
    id: "surfing",
    emoji: "🏄",
    title: "Surfing Experience of a Lifetime",
    content: [
      "Scar Reef is a world class wave that awakes about 30 times a year with a barrel that takes off like a freight train and has several backdoor sections. Advanced surfers will love the challenge. The rest of the year, Scar Reef is fun and perfect for beginners at 2-3ft, and a great playground for improving your technique.",
      "Little Bingin, is just next door. Less powerful but still really entertaining, you can expect fun barrels and crystal-clear waters everyday on this sweet A-Frame.",
      "Our boats can shuttle you to and from the lineup and we can even arrange a surf guide to make your experience smoother. Want to learn how to surf or drastically improve your game? Why not hire one of our expert surf coaches? If you've come unprepared, we've got you covered with a large quiver of longboards and stand-up paddles to rent from.",
    ],
  },
  {
    id: "foiling",
    emoji: "🪁",
    title: "Foiling",
    content: [
      "Foiling is our latest addition to the long list of riding activities available at Scar Reef Resort. If you're new to the sport, our certified instructor will make sure you have the best time in the water. Already feel comfortable on a foil board? Let our experienced driver tow you around the turquoise lagoon of West Sumbawa.",
    ],
  },
  {
    id: "beach",
    emoji: "🏖️",
    title: "Beach Days on End",
    content: [
      "Scar Reef Resort is a true playground for all water-related activities. Life underwater here is just something else and it is best explored on a DIY snorkeling excursion. Expect to encounter turtles, manta rays, dugongs and more.",
      "We also organize super fun boat trips around the area, exploring the lagoon, the sheltered bays and the secluded beaches. Don't forget to grab your camera and some of our fishing equipment to make the most out of this journey.",
      "For a true beach holiday, of course, you always have the option to chill on our pristine white-sand beach, to play some beach tennis on our court or to try finding your perfect balance on our slackline. Oh, and did we mention that you can order a cocktail at our bar?",
    ],
  },
  {
    id: "explore",
    emoji: "🌄",
    title: "Explore New Frontiers — To the Land We Return",
    content: [
      "Nature is all around Scar Reef Resort. On one hand, the infinite ocean, on the other, the lush tropical island of Sumbawa.",
      "Embark on a sunrise or sunset hike to catch the best views of Jelenga, join a waterfall excursion to refresh yourself on a hot day and recharge your batteries amidst the dense jungle.",
    ],
  },
  {
    id: "wellness",
    emoji: "🧘",
    title: "Breathe In, Breathe Out",
    content: [
      "Scar Reef Resort is a stunning location to escape the hustle and bustle of modern life and indulge in some well-deserved self-care.",
      "Facing the turquoise lagoon, our premium yoga shala is the perfect place to unwind and practice meditation, yoga, or any other discipline to energize your body and your mind.",
      "In for some extra relaxation? Let yourself go under the healing hands of our therapist for a unique massage session given in the intimacy of our massage shala.",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/activities-overview.jpg"
          alt="Scar Reef Resort Experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[var(--font-outfit)] uppercase tracking-wide">
            Experiences
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto text-lg">
            From sunrise hikes to endless surf and foil sessions, and snorkeling
            in the crystal-clear waters, there are countless fun activities to
            enjoy at Scar Reef Resort.
          </p>
        </div>
      </section>

      {/* Package notice */}
      <section className="py-8 bg-primary/5 border-b border-primary/10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-neutral-700 text-sm">
            All of your favourite activities can be picked out à la carte but, if
            you&apos;re particularly interested in surfing or foiling while you&apos;re
            staying with us, we recommend going for one of our{" "}
            <strong>all-inclusive packages</strong>.
          </p>
        </div>
      </section>

      {/* Experience Sections */}
      {experiences.map((exp, index) => (
        <section
          key={exp.id}
          id={exp.id}
          className={`py-20 ${index % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">{exp.emoji}</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-[var(--font-outfit)] uppercase">
                {exp.title}
              </h2>
            </div>
            <div className="space-y-4 pl-14">
              {exp.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-neutral-600 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA to Activities */}
      <section className="py-16 bg-neutral-900 text-white text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-neutral-400 mb-4 text-sm uppercase tracking-widest">
            Whether you&apos;ve come to unwind or chase endless surf
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 font-[var(--font-outfit)]">
            Our curated activities are the perfect addition to your stay
          </h2>
          <Link href="/activities">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6">
              View All Activities & Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
