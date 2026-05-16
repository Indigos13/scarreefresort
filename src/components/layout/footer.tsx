"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Waves, Mail, Phone, MapPin, Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="bg-white text-neutral-600 border-t border-neutral-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Image src="/images/sr_logo_header.svg" alt="Scar Reef Resort" width={180} height={50} className="h-12 w-auto" />
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-500 max-w-xs">
                            {SITE_CONFIG.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                            Quick Links
                        </h3>
                        <div className="flex flex-col gap-2">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/#villas", label: "Our Villas" },
                                { href: "/#about", label: "About Us" },
                                { href: "/#booking", label: "Book Now" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-neutral-500 hover:text-primary transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
                            Contact
                        </h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="flex items-center gap-3 text-sm text-neutral-500 hover:text-primary transition-colors"
                            >
                                <Mail className="h-4 w-4 shrink-0" />
                                {SITE_CONFIG.email}
                            </a>
                            <a
                                href={`tel:${SITE_CONFIG.phone}`}
                                className="flex items-center gap-3 text-sm text-neutral-500 hover:text-primary transition-colors"
                            >
                                <Phone className="h-4 w-4 shrink-0" />
                                {SITE_CONFIG.phone}
                            </a>
                            <div className="flex items-start gap-3 text-sm text-neutral-500">
                                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                {SITE_CONFIG.address}
                            </div>
                            <a
                                href={SITE_CONFIG.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm text-neutral-500 hover:text-primary transition-colors"
                            >
                                <Instagram className="h-4 w-4 shrink-0" />
                                @scarreefresort
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-200">
                    <p className="text-center text-xs text-neutral-400">
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
