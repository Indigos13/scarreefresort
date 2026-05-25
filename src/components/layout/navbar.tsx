"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
    { href: "/accommodation", label: "Accommodation" },
    { href: "/restaurant", label: "Restaurant" },
    { href: "/experience", label: "Experience" },
    { href: "/activities", label: "Activities" },
    { href: "/getting-here", label: "Getting Here" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact & FAQ" },
];

export function Navbar() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isAdmin) return null;

    const showSolid = scrolled || !isHome;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showSolid
                    ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-neutral-200"
                    : "bg-transparent"
                }`}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image src="/images/sr_logo_header.svg" alt="Scar Reef Resort" width={180} height={50} className="h-12 w-auto" priority />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-0.5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    pathname === link.href
                                        ? "text-primary bg-primary/10"
                                        : showSolid
                                            ? "text-neutral-600 hover:text-primary hover:bg-neutral-100"
                                            : "text-white/90 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/booking" className="ml-3">
                            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all border-0 px-6">
                                Book Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Nav */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={showSolid ? "text-neutral-800 hover:bg-neutral-100" : "text-white hover:bg-white/10"}
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-72 bg-white border-neutral-200"
                        >
                            <div className="flex flex-col gap-2 mt-8">
                                <Link
                                    href="/"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-3 text-base font-medium text-neutral-600 hover:text-primary rounded-xl hover:bg-neutral-100 transition-all"
                                >
                                    Home
                                </Link>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className={`px-4 py-3 text-base font-medium rounded-xl transition-all ${
                                            pathname === link.href
                                                ? "text-primary bg-primary/5"
                                                : "text-neutral-600 hover:text-primary hover:bg-neutral-100"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/booking"
                                    onClick={() => setOpen(false)}
                                    className="mt-4"
                                >
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
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
