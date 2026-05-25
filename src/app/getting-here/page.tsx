import Image from "next/image";
import Link from "next/link";
import { Check, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TRANSPORT_OPTIONS,
  PACKING_LIST,
  SITE_CONFIG,
} from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Here - Scar Reef Resort",
  description:
    "How to reach Scar Reef Resort by plane, taxi, boat, car. See transport options and contact us for arrangements.",
};

export default function GettingHerePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/location-map.jpg"
          alt="Getting to Scar Reef Resort"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-[var(--font-outfit)] uppercase tracking-wide">
            Getting Here
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto text-lg">
            Scar Reef Resort is remote, but easier to reach than you think — and
            always worth the journey.
          </p>
        </div>
      </section>

      {/* Transport Options */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-[var(--font-outfit)] mb-4 text-center">
            Getting to Scar Reef Resort
          </h2>
          <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
            There are several ways to reach us. We&apos;re happy to help arrange
            your full journey — just ask.
          </p>

          <div className="space-y-6">
            {TRANSPORT_OPTIONS.map((option) => (
              <div
                key={option.id}
                className={`rounded-2xl border p-6 sm:p-8 transition-all ${
                  option.recommended
                    ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/5"
                    : "border-neutral-200 bg-neutral-50"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{option.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-neutral-900">
                        {option.title}
                      </h3>
                      {option.recommended && (
                        <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pl-12 space-y-3 mb-4">
                  {option.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-neutral-600 text-sm">{step}</p>
                    </div>
                  ))}
                </div>

                <p className="pl-12 text-sm text-primary font-medium italic">
                  {option.note}
                </p>
              </div>
            ))}
          </div>

          {/* Help CTA */}
          <div className="mt-12 text-center">
            <p className="text-neutral-600 mb-4">
              Need help planning? We&apos;ll gladly arrange the full journey for you.
            </p>
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3">
                <Phone className="mr-2 h-4 w-4" />
                Contact Us on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Packing List */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 font-[var(--font-outfit)] mb-12 text-center uppercase">
            What to Pack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* General */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4 text-lg flex items-center gap-2">
                🎒 General
              </h3>
              <ul className="space-y-2">
                {PACKING_LIST.general.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-neutral-600"
                  >
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Surf Trip */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4 text-lg flex items-center gap-2">
                🏄 Surf Trip
              </h3>
              <ul className="space-y-2">
                {PACKING_LIST.surfTrip.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-neutral-600"
                  >
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Don't need */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200">
              <h3 className="font-bold text-neutral-900 mb-4 text-lg flex items-center gap-2">
                ✨ You Don&apos;t Need
              </h3>
              <ul className="space-y-2">
                {PACKING_LIST.notNeeded.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-neutral-500"
                  >
                    <X className="h-3.5 w-3.5 text-neutral-300 shrink-0" />
                    <span className="line-through">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-neutral-400 mt-4 italic">
                We provide these at the resort!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 font-[var(--font-outfit)]">
            Find Us
          </h2>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-xl">
            <Image
              src="/images/location-map.jpg"
              alt="Scar Reef Resort location"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-neutral-500 mt-4">
            Pantai Jelenga, West Sumbawa, Indonesia
          </p>
        </div>
      </section>
    </>
  );
}
