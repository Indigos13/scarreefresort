import Link from "next/link";
import { Waves, Mail, Phone, MapPin, Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="bg-neutral-950 text-white/70 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
                                <Waves className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-white">
                                    {SITE_CONFIG.name}
                                </p>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-300/70">
                                    {SITE_CONFIG.tagline}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-white/50 max-w-xs">
                            {SITE_CONFIG.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">
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
                                    className="text-sm text-white/50 hover:text-amber-300 transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">
                            Contact
                        </h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="flex items-center gap-3 text-sm text-white/50 hover:text-amber-300 transition-colors"
                            >
                                <Mail className="h-4 w-4 shrink-0" />
                                {SITE_CONFIG.email}
                            </a>
                            <a
                                href={`tel:${SITE_CONFIG.phone}`}
                                className="flex items-center gap-3 text-sm text-white/50 hover:text-amber-300 transition-colors"
                            >
                                <Phone className="h-4 w-4 shrink-0" />
                                {SITE_CONFIG.phone}
                            </a>
                            <div className="flex items-start gap-3 text-sm text-white/50">
                                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                {SITE_CONFIG.address}
                            </div>
                            <a
                                href={SITE_CONFIG.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm text-white/50 hover:text-amber-300 transition-colors"
                            >
                                <Instagram className="h-4 w-4 shrink-0" />
                                @scarreefresort
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-center text-xs text-white/30">
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
