"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { AdminOrderTable } from "@/components/admin/orders/AdminOrderTable";
import { useAdminOrders } from "@/hooks/admin/useAdminOrders";
import { ORDER_STATUS } from "@/lib/constants";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { orders, total, isLoading, updateStatus } = useAdminOrders({
    search,
    status: status || undefined,
  });

  const handleUpdate = async (id: number | string, newStatus: string, paymentStatus?: string) => {
    await updateStatus({ id, payload: { status: newStatus, payment_status: paymentStatus } });
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Customer Orders"
        description={`Manage ${total} transactions, verify payments, and update delivery dispatch`}
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by order # or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setStatus("")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              status === ""
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setStatus(ORDER_STATUS.PENDING)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              status === ORDER_STATUS.PENDING
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            Pending
          </button>
          <button
            type="button"
            onClick={() => setStatus(ORDER_STATUS.PROCESSING)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              status === ORDER_STATUS.PROCESSING
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            Processing
          </button>
          <button
            type="button"
            onClick={() => setStatus(ORDER_STATUS.SHIPPED)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              status === ORDER_STATUS.SHIPPED
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            Shipped
          </button>
          <button
            type="button"
            onClick={() => setStatus(ORDER_STATUS.DELIVERED)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              status === ORDER_STATUS.DELIVERED
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            Delivered
          </button>
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      ) : (
        <AdminOrderTable orders={orders} onUpdateStatus={handleUpdate} />
      )}
    </div>
  );
}
