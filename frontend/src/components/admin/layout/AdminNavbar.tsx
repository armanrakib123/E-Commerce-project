"use client";

import React from "react";
import { useUiStore } from "@/store/ui.store";
import { useAuth } from "@/hooks/useAuth";
import { Menu, LogOut, Bell, ExternalLink } from "lucide-react";
import Link from "next/link";
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";

export function AdminNavbar() {
  const toggleAdminSidebar = useUiStore((state) => state.toggleAdminSidebar);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleAdminSidebar}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Toggle navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="rounded-full bg-purple-100 dark:bg-purple-950/60 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-300">
          Admin Control Center
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition"
        >
          <span>Live Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <NotificationDropdown />

        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 font-bold text-xs text-white">
            {user?.name?.charAt(0) || "A"}
          </div>
          <span className="hidden md:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
            {user?.name || "Administrator"}
          </span>
          <button
            type="button"
            onClick={() => logout()}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
