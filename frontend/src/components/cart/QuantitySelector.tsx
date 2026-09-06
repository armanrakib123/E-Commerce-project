"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  max?: number;
  min?: number;
  onChange: (quantity: number) => void;
  size?: "sm" | "md";
}

export function QuantitySelector({
  quantity,
  max = 99,
  min = 1,
  onChange,
  size = "md",
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const isSmall = size === "sm";

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 ${
        isSmall ? "h-8" : "h-10"
      }`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 ${
          isSmall ? "w-8 h-8" : "w-10 h-10"
        }`}
        aria-label="Decrease quantity"
      >
        <Minus className={isSmall ? "w-3 h-3" : "w-4 h-4"} />
      </button>

      <span
        className={`text-center font-bold text-slate-800 dark:text-slate-100 select-none ${
          isSmall ? "w-8 text-xs" : "w-10 text-sm"
        }`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 ${
          isSmall ? "w-8 h-8" : "w-10 h-10"
        }`}
        aria-label="Increase quantity"
      >
        <Plus className={isSmall ? "w-3 h-3" : "w-4 h-4"} />
      </button>
    </div>
  );
}
