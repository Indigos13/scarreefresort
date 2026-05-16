import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scar Reef Resort — Premium Surf & Beachfront Villas in West Sumbawa",
  description:
    "Discover paradise at Scar Reef Resort — three exclusive beachfront villas nestled along the pristine coastline of West Sumbawa. Experience barefoot luxury, world-class surf, and breathtaking ocean views.",
  keywords: [
    "villa",
    "resort",
    "beachfront",
    "luxury",
    "Sumbawa",
    "West Sumbawa",
    "surf resort",
    "reef break",
    "remote adventure",
    "booking",
    "holiday",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
