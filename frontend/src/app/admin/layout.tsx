"use client";

import React from "react";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminNavbar } from "@/components/admin/layout/AdminNavbar";
import { useUiStore } from "@/store/ui.store";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminSidebarOpen = useUiStore((state) => state.adminSidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex">
      <AdminSidebar />
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300",
          adminSidebarOpen ? "pl-64" : "pl-20"
        )}
      >
        <AdminNavbar />
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
