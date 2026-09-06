"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { ProductGallery } from "./ProductGallery";
import { ProductPrice } from "./ProductPrice";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { ReviewList } from "@/components/reviews/ReviewList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart.store";
import { ShoppingBag, Star, ShieldCheck, Truck, RefreshCw, Check } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItem(product.id, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  const inStock = product.stock > 0;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Gallery */}
        <ProductGallery
          images={product.images}
          mainImage={product.image}
          name={product.name}
        />

        {/* Info Column */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Status */}
            <div className="flex items-center justify-between">
              {product.category && (
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {product.category.name}
                </span>
              )}
              <Badge variant={inStock ? "success" : "danger"}>
                {inStock ? `In Stock (${product.stock} left)` : "Out of Stock"}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-100">
                {product.rating || 4.9}
              </span>
              <span className="text-slate-400">·</span>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {product.reviews?.length || product.reviews_count || 12} reviews
              </button>
            </div>

            {/* Price */}
            <div className="py-3 border-y border-slate-100 dark:border-slate-800">
              <ProductPrice price={product.price} comparePrice={product.compare_price} size="lg" />
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions: Quantity & Add to Cart */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Quantity
              </span>
              <QuantitySelector
                quantity={quantity}
                max={product.stock}
                onChange={setQuantity}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                disabled={!inStock}
                isLoading={isAdding}
                onClick={handleAddToCart}
                className="flex-1 gap-2 rounded-2xl shadow-indigo-500/20 shadow-lg"
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-300 animate-in zoom-in-50" />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <Truck className="w-4 h-4 text-indigo-600" />
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">Free Express Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <RefreshCw className="w-4 h-4 text-amber-600" />
                <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">30-Day Easy Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description & Reviews */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("desc")}
            className={`pb-3 text-sm font-bold transition border-b-2 ${
              activeTab === "desc"
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Product Overview & Specs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-bold transition border-b-2 ${
              activeTab === "reviews"
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Customer Reviews ({product.reviews?.length || 12})
          </button>
        </div>

        {activeTab === "desc" ? (
          <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 space-y-4">
            <p>{product.description}</p>
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Key Features:</h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Engineered using premium grade materials for long-lasting durability.</li>
              <li>Fully compatible with multi-platform wireless connectivity protocols.</li>
              <li>Ultra-low latency audio processing and intelligent power management.</li>
              <li>Factory calibrated output with comprehensive quality testing.</li>
            </ul>
          </div>
        ) : (
          <ReviewList
            productId={product.id}
            initialReviews={product.reviews || []}
            averageRating={product.rating || 4.8}
            totalReviews={product.reviews_count || product.reviews?.length || 12}
          />
        )}
      </div>
    </div>
  );
}
