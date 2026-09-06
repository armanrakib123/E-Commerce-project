"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu, User as UserIcon, LogOut, Shield, Package, Heart } from "lucide-react";
import { Container } from "./Container";
import { NAV_LINKS } from "@/lib/constants";
import { useCartStore } from "@/store/cart.store";
import { useAuth } from "@/hooks/useAuth";
import { useUiStore } from "@/store/ui.store";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const itemCount = useCartStore((state) => state.itemCount);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const userMenuItems = [
    {
      label: "My Profile",
      icon: <UserIcon className="w-4 h-4" />,
      onClick: () => router.push("/profile"),
    },
    {
      label: "My Orders",
      icon: <Package className="w-4 h-4" />,
      onClick: () => router.push("/orders"),
    },
    ...(isAdmin
      ? [
          {
            label: "Admin Dashboard",
            icon: <Shield className="w-4 h-4 text-purple-600" />,
            onClick: () => router.push("/admin"),
          },
        ]
      : []),
    {
      label: "Sign Out",
      icon: <LogOut className="w-4 h-4" />,
      danger: true,
      onClick: () => logout(),
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-9 w-32 sm:w-36">
                <Image
                  src="/images/logo/logo.svg"
                  alt="NovaStore"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex flex-1 max-w-md items-center relative"
          >
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products, brands, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition"
            />
          </form>

          {/* Action Icons & User */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Dropdown */}
            <NotificationDropdown />

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[11px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* User Account / Auth */}
            {isAuthenticated && user ? (
              <Dropdown
                align="right"
                items={userMenuItems}
                trigger={
                  <button className="flex items-center gap-2 p-1 pl-2 rounded-full border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition">
                    <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-[11px] font-bold text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  </button>
                }
              />
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
