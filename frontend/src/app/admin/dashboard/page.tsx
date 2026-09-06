"use client";

import React from "react";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { useDashboard } from "@/hooks/admin/useDashboard";
import { formatCurrency } from "@/lib/formatCurrency";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useDashboard();

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-3xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Dashboard Overview"
        description="Real-time sales performance, transaction metrics, and store operations"
      />

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.total_revenue)}
          growth={stats.revenue_growth}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatsCard
          title="Total Orders"
          value={stats.total_orders}
          growth={stats.orders_growth}
          icon={<ShoppingCart className="w-5 h-5" />}
        />
        <StatsCard
          title="Active Products"
          value={stats.total_products}
          icon={<Package className="w-5 h-5" />}
          subtitle="Items currently in store"
        />
        <StatsCard
          title="Registered Customers"
          value={stats.total_customers}
          icon={<Users className="w-5 h-5" />}
          subtitle="Lifetime users"
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart data={stats.revenue_chart} />

      {/* Recent Orders */}
      <RecentOrders orders={stats.recent_orders} />
    </div>
  );
}
