"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatCurrency";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Tag } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  showCheckoutButton?: boolean;
}

export function CartSummary({ subtotal, showCheckoutButton = true }: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = subtotal * 0.05; // 5% standard tax
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toLowerCase() === "discount10") {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else {
      alert("Invalid code. Try using 'DISCOUNT10' for 10% off!");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Order Summary</h3>

      {/* Promo Code */}
      <form onSubmit={handleApplyPromo} className="flex gap-2">
        <input
          type="text"
          placeholder="Promo code (DISCOUNT10)"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          disabled={promoApplied}
          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <Button
          type="submit"
          variant="outline"
          size="sm"
          disabled={promoApplied || !promoCode}
          className="text-xs"
        >
          {promoApplied ? "Applied" : "Apply"}
        </Button>
      </form>

      {/* Price breakdown */}
      <div className="space-y-3 text-sm border-t border-slate-100 dark:border-slate-800 pt-4">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Discount (10%)
            </span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Estimated Shipping</span>
          <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
        </div>

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Estimated Sales Tax (5%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4 text-base font-bold text-slate-900 dark:text-white">
          <span>Total</span>
          <span className="text-xl text-indigo-600 dark:text-indigo-400">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {showCheckoutButton && (
        <Link href="/checkout" className="block w-full">
          <Button
            variant="primary"
            size="lg"
            disabled={subtotal === 0}
            className="w-full gap-2 rounded-2xl shadow-lg shadow-indigo-500/20"
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Bank-grade 256-Bit SSL Encrypted Checkout</span>
      </div>
    </div>
  );
}
