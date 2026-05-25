"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin")) return null;

    return (
        <>
            {/* CTA Section */}
            <section className="py-20 bg-primary/5 border-t border-primary/10">
                <div className="mx-auto max-w-3xl px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 font-[var(--font-outfit)]">
                        LOOKING FORWARD TO MEETING YOU
                    </h2>
                    <p className="text-neutral-600 mb-6">
                        Feel free to contact our helpful team if you have questions regarding reservations at Scar Reef Resort.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                    >
                        CONTACT US
                    </Link>
                </div>
            </section>

            <footer className="bg-neutral-900 text-neutral-300">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Contact */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                                Contact
                            </h3>
                            <div className="flex flex-col gap-3">
                                <a
                                    href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                                    className="flex items-center gap-3 text-sm text-neutral-400 hover:text-primary transition-colors"
                                >
                                    <Phone className="h-4 w-4 shrink-0" />
                                    {SITE_CONFIG.phone}
                                </a>
                                <a
                                    href={`mailto:${SITE_CONFIG.email}`}
                                    className="flex items-center gap-3 text-sm text-neutral-400 hover:text-primary transition-colors"
                                >
                                    <Mail className="h-4 w-4 shrink-0" />
                                    {SITE_CONFIG.email}
                                </a>
                            </div>
                        </div>

                        {/* Information */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                                Information
                            </h3>
                            <div className="flex flex-col gap-2">
                                {[
                                    { href: "/contact", label: "Contact & FAQ" },
                                    { href: "/terms-and-conditions", label: "Terms & Conditions" },
                                ].map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-sm text-neutral-400 hover:text-primary transition-colors w-fit"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Connect */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                                Connect With Us
                            </h3>
                            <div className="flex flex-col gap-2">
                                <a
                                    href={SITE_CONFIG.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-neutral-400 hover:text-primary transition-colors"
                                >
                                    <Instagram className="h-4 w-4 shrink-0" />
                                    Instagram
                                </a>
                                <a
                                    href={SITE_CONFIG.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-neutral-400 hover:text-primary transition-colors"
                                >
                                    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    Facebook
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-neutral-800">
                        <p className="text-center text-xs text-neutral-600 uppercase tracking-widest">
                            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
