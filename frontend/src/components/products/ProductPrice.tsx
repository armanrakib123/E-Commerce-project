import React from "react";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  comparePrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProductPrice({ price, comparePrice, size = "md", className }: ProductPriceProps) {
  const hasDiscount = comparePrice && comparePrice > price;

  const sizeStyles = {
    sm: "text-sm font-semibold",
    md: "text-base font-bold",
    lg: "text-2xl font-extrabold",
  };

  const compareStyles = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-baseline gap-2 flex-wrap", className)}>
      <span className={cn("text-slate-900 dark:text-slate-100", sizeStyles[size])}>
        {formatCurrency(price)}
      </span>
      {hasDiscount && (
        <span className={cn("text-slate-400 line-through font-normal", compareStyles[size])}>
          {formatCurrency(comparePrice)}
        </span>
      )}
    </div>
  );
}
