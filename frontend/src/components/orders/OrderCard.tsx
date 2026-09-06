import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Order } from "@/types/order";
import { OrderStatus } from "./OrderStatus";
import { formatDate } from "@/lib/formatDate";
import { formatCurrency } from "@/lib/formatCurrency";
import { Package, Clock, MapPin, CreditCard } from "lucide-react";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {order.order_number || `Order #${order.id}`}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDate(order.created_at)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <OrderStatus status={order.status} />
          <span className="text-base font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(order.total_amount)}
          </span>
        </div>
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {order.items?.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                <Image
                  src={item.product?.image || "/images/products/placeholder.png"}
                  alt={item.product?.name || "Product"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {item.product?.name || "Product Item"}
                </p>
                <p className="text-[11px] text-slate-400">Qty: {item.quantity} × {formatCurrency(item.price)}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>Ship to: {order.shipping_address}, {order.shipping_city}</span>
        </div>
        <div className="flex items-center gap-1.5 capitalize">
          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
          <span>Payment: {order.payment_method} ({order.payment_status || "confirmed"})</span>
        </div>
      </div>
    </div>
  );
}
