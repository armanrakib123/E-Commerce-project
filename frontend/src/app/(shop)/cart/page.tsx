"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CartList } from "@/components/cart/CartList";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCartStore } from "@/store/cart.store";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, clearCart } = useCartStore();

  return (
    <div className="py-8 sm:py-12">
      <Container className="space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review and adjust your selected items before checkout
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-600 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <CartList items={items} />

            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      </Container>
    </div>
  );
}
