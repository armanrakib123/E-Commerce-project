"use client";

import React from "react";
import { CartItem as CartItemType } from "@/types/cart";
import { CartItem } from "./CartItem";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CartListProps {
  items: CartItemType[];
}

export function CartList({ items }: CartListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Cart is Empty</h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          Looks like you haven&apos;t added any items to your shopping cart yet.
        </p>
        <Link href="/products" className="mt-6">
          <Button variant="primary" size="md">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
