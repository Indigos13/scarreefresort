"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SITE_CONFIG } from "@/lib/constants";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#villas", label: "Villas" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5"
                    : "bg-gradient-to-b from-black/50 to-transparent"
                }`}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow">
                            <Waves className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-white tracking-wide leading-tight">
                                {SITE_CONFIG.name}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80 font-medium">
                                {SITE_CONFIG.tagline}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/#booking" className="ml-3">
                            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all border-0 px-6">
                                Book Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Nav */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-72 bg-neutral-950 border-white/10"
                        >
                            <div className="flex flex-col gap-2 mt-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-3 text-base font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-all"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/#booking"
                                    onClick={() => setOpen(false)}
                                    className="mt-4"
                                >
                                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold">
                                        Book Now
                                    </Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}
