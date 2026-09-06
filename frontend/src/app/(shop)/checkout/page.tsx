"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container className="space-y-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Checkout
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Complete your shipping details and choose payment option
            </p>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Cart
          </Link>
        </div>

        <CheckoutForm />
      </Container>
    </div>
  );
}
