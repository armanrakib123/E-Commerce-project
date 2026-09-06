"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CartItem as CartItemType } from "@/types/cart";
import { QuantitySelector } from "./QuantitySelector";
import { formatCurrency } from "@/lib/formatCurrency";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const product = item.product;
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0">
      {/* Thumbnail */}
      <Link
        href={`/products/${product?.slug || item.product_id}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800"
      >
        <Image
          src={product?.image || "/images/products/placeholder.png"}
          alt={product?.name || "Product"}
          fill
          className="object-cover"
        />
      </Link>

      {/* Info & Quantity */}
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Link
            href={`/products/${product?.slug || item.product_id}`}
            className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-1"
          >
            {product?.name || "Product"}
          </Link>
          <p className="text-xs text-slate-500 mt-0.5">
            Unit Price: {formatCurrency(item.price)}
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4">
          <QuantitySelector
            quantity={item.quantity}
            size="sm"
            onChange={(q) => updateQuantity(item.id, q)}
          />

          <span className="text-sm font-bold text-slate-900 dark:text-slate-100 min-w-[75px] text-right">
            {formatCurrency(lineTotal)}
          </span>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 transition"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
