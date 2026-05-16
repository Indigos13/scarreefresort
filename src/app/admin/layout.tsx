"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  BedDouble,
  Calendar,
  LogOut,
  Menu,
  X,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Rooms",
    href: "/admin/rooms",
    icon: BedDouble,
  },
  {
    label: "Calendar Sync",
    href: "/admin/calendar",
    icon: Calendar,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show admin layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-neutral-500 hover:text-neutral-900"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <span className="text-neutral-900 font-bold text-sm">Admin Panel</span>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-neutral-200 flex flex-col transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-center p-1">
            <Image src="/images/sr_logo_header.svg" alt="Scar Reef Resort" width={140} height={40} className="h-8 w-auto" priority />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200">
          {session?.user && (
            <div className="flex items-center gap-3 px-4 py-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">
                  {session.user.name?.charAt(0)?.toUpperCase() || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-neutral-900 text-sm font-medium truncate">
                  {session.user.name}
                </p>
                <p className="text-neutral-500 text-xs truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start text-neutral-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}

