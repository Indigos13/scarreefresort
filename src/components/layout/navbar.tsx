"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isAdmin) return null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 border-b border-neutral-200"
                    : "bg-white/80 backdrop-blur-sm border-b border-neutral-100"
                }`}
        >
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image src="/images/sr_logo_header.svg" alt="Scar Reef Resort" width={180} height={50} className="h-12 w-auto" priority />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary rounded-lg hover:bg-neutral-100 transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/#booking" className="ml-3">
                            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all border-0 px-6">
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
                                className="text-neutral-800 hover:bg-neutral-100"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-72 bg-white border-neutral-200"
                        >
                            <div className="flex flex-col gap-2 mt-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        className="px-4 py-3 text-base font-medium text-neutral-600 hover:text-primary rounded-xl hover:bg-neutral-100 transition-all"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link
                                    href="/#booking"
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
