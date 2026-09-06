"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { ProductPrice } from "./ProductPrice";
import { Star, ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    try {
      await addItem(product.id, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  const discount = product.compare_price && product.compare_price > product.price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : product.discount_percent || 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300">
      {/* Product Image Area */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={product.image || "/images/products/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span className="rounded-lg bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              -{discount}%
            </span>
          )}
          {product.featured ? (
            <span className="rounded-lg bg-indigo-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
              Featured
            </span>
          ) : null}
        </div>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 right-3 z-10">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-all duration-200 ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-slate-100 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 backdrop-blur-md"
            }`}
            title="Add to cart"
          >
            {isAdded ? (
              <Check className="w-5 h-5 animate-in zoom-in-50" />
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )}
          </button>
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {product.category && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            {product.category.name}
          </span>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {product.rating || 4.8}
          </span>
          {product.reviews_count ? (
            <span className="text-slate-400">({product.reviews_count})</span>
          ) : null}
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <ProductPrice price={product.price} comparePrice={product.compare_price} size="md" />
        </div>
      </div>
    </div>
  );
}
