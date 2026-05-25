"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  "/images/gallery/gallery-01.jpg",
  "/images/gallery/gallery-02.jpg",
  "/images/gallery/gallery-03.jpg",
  "/images/gallery/gallery-04.jpg",
  "/images/gallery/gallery-05.jpg",
  "/images/gallery/gallery-06.jpg",
  "/images/gallery/gallery-07.jpg",
  "/images/gallery/gallery-08.jpg",
  "/images/gallery/gallery-09.jpg",
  "/images/gallery/gallery-10.jpg",
  "/images/gallery/gallery-11.jpg",
  "/images/gallery/gallery-12.jpg",
  "/images/gallery/gallery-13.jpg",
  "/images/gallery/gallery-14.jpg",
  "/images/gallery/gallery-15.jpg",
  "/images/gallery/gallery-16.jpg",
  "/images/gallery/gallery-17.jpg",
  "/images/gallery/gallery-18.jpg",
  "/images/gallery/gallery-19.jpg",
  "/images/gallery/gallery-20.jpg",
  "/images/gallery/gallery-21.jpg",
  "/images/gallery/gallery-23.jpg",
];

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % galleryImages.length : null
    );

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-neutral-900 text-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-outfit)] uppercase tracking-wide">
            Gallery
          </h1>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
            Explore the unique atmosphere and way of living at Scar Reef Resort.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryImages.map((img, index) => (
              <button
                key={img}
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Scar Reef Resort - ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/60 hover:text-white p-2 z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 text-white/60 hover:text-white p-2 z-10"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 text-white/60 hover:text-white p-2 z-10"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/10] mx-8">
            <Image
              src={galleryImages[lightboxIndex]}
              alt={`Gallery ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <div className="absolute bottom-6 text-white/40 text-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}
