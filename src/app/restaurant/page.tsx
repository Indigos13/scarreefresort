import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant - Scar Reef Resort",
  description:
    "Western cuisine with a French twist and Indonesian classics. Fresh, healthy food from our permaculture garden.",
};

export default function RestaurantPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/restaurant-food.jpg"
          alt="Scar Reef Resort Restaurant"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.3em] mb-3">
            &#59; Home Made is Our Motto
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[var(--font-outfit)] uppercase tracking-wide">
            Restaurant
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <p className="text-lg text-neutral-700 leading-relaxed">
              Our restaurant offers <strong>western cuisine with a French twist</strong> as
              well as your favourite Indonesian classics for breakfast, lunch and
              dinner.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              At Scar Reef Resort, we celebrate fresh, healthy, and flavorful
              cuisine. Most of our ingredients are locally sourced and grown
              on-site whenever possible.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Our kitchen team prepares everything in-house — from bread and
              pizza dough to sauces, stews, and desserts — blending local
              traditions with international flair.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Whether you&apos;re in the mood for a nourishing bowl or a wood-fired
              pizza, you&apos;ll find vibrant, homemade food to enjoy after a long
              surf or a day of exploring.
            </p>
            <p className="text-neutral-600 leading-relaxed italic border-l-4 border-primary pl-4 text-left">
              Come visit us to taste the delicious Jelenga Village honey, one of
              Indonesia&apos;s best honeys.
            </p>
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/restaurant-1.jpg"
                alt="Scar Reef Restaurant"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/restaurant-2.jpg"
                alt="Scar Reef Restaurant food"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Half-board included */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 font-[var(--font-outfit)]">
            Included in Every Stay
          </h2>
          <p className="text-neutral-600 mb-8">
            All our accommodation packages include half-board: enjoy breakfast
            and lunch fresh from our kitchen, plus unlimited local coffee, tea,
            and water throughout your stay.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <span className="text-3xl mb-3 block">🍳</span>
              <h3 className="font-semibold text-neutral-900">Breakfast</h3>
              <p className="text-sm text-neutral-500 mt-1">
                Fresh daily breakfast
              </p>
            </div>
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <span className="text-3xl mb-3 block">🥗</span>
              <h3 className="font-semibold text-neutral-900">Lunch</h3>
              <p className="text-sm text-neutral-500 mt-1">
                Homemade from our kitchen
              </p>
            </div>
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <span className="text-3xl mb-3 block">☕</span>
              <h3 className="font-semibold text-neutral-900">Unlimited</h3>
              <p className="text-sm text-neutral-500 mt-1">
                Coffee, tea & water all day
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
