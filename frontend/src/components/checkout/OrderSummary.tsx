import React from "react";
import Image from "next/image";
import { CartItem } from "@/types/cart";
import { formatCurrency } from "@/lib/formatCurrency";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
}

export function OrderSummary({ items, subtotal }: OrderSummaryProps) {
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
        Review Items ({items.length})
      </h3>

      <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-slate-100 dark:divide-slate-800/60">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
              <Image
                src={item.product?.image || "/images/products/placeholder.png"}
                alt={item.product?.name || "Product"}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {item.product?.name}
              </p>
              <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 shrink-0">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes (5%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-3 border-t border-slate-100 dark:border-slate-800">
          <span>Final Total</span>
          <span className="text-base text-indigo-600 dark:text-indigo-400">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
