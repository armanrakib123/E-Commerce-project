import React from "react";
import { Order } from "@/types/order";
import { OrderCard } from "./OrderCard";
import { PackageX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 mb-4">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Orders Found</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          You haven&apos;t placed any orders yet. Discover our latest items and get started.
        </p>
        <Link href="/products" className="mt-6">
          <Button variant="primary" size="md">
            Explore Store
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
