"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft, Shield } from "lucide-react";
import { useUiStore } from "@/store/ui.store";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const adminSidebarOpen = useUiStore((state) => state.adminSidebarOpen);

  const navItems = [
    { label: "Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Products", href: "/admin/products", icon: <Package className="w-4 h-4" /> },
    { label: "Orders", href: "/admin/orders", icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-all duration-300",
        adminSidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div>
        {/* Brand Header */}
        <div className="flex h-16 items-center px-6 border-b border-slate-100 dark:border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            {adminSidebarOpen && (
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base">
                Admin<span className="text-purple-600">Hub</span>
              </span>
            )}
          </Link>
        </div>

        {/* Links */}
        <div className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin" || pathname === "/admin/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {item.icon}
                {adminSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Return to Customer Shop */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition",
            !adminSidebarOpen && "justify-center"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          {adminSidebarOpen && <span>Exit to Store</span>}
        </Link>
      </div>
    </aside>
  );
}
