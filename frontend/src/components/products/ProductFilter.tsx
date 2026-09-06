"use client";

import React from "react";
import { Category } from "@/types/category";
import { ProductFilterParams } from "@/types/product";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

interface ProductFilterProps {
  categories: Category[];
  filters: ProductFilterParams;
  onChange: (filters: ProductFilterParams) => void;
  onReset: () => void;
}

export function ProductFilter({ categories, filters, onChange, onReset }: ProductFilterProps) {
  const handleCategoryClick = (catId?: number) => {
    onChange({
      ...filters,
      category_id: filters.category_id === catId ? undefined : catId,
      page: 1,
    });
  };

  const handlePriceChange = (min?: number, max?: number) => {
    onChange({
      ...filters,
      min_price: min,
      max_price: max,
      page: 1,
    });
  };

  const handleSortChange = (sort: string) => {
    onChange({
      ...filters,
      sort,
      page: 1,
    });
  };

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          Filter & Sort
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Sort By
        </label>
        <select
          value={filters.sort || "newest"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Categories
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => handleCategoryClick(undefined)}
            className={`flex w-full items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition ${
              !filters.category_id
                ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex w-full items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition ${
                filters.category_id === cat.id
                  ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <span>{cat.name}</span>
              {cat.products_count !== undefined && (
                <span className="text-[10px] text-slate-400">({cat.products_count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min ($)"
            value={filters.min_price || ""}
            onChange={(e) => handlePriceChange(e.target.value ? Number(e.target.value) : undefined, filters.max_price)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <input
            type="number"
            placeholder="Max ($)"
            value={filters.max_price || ""}
            onChange={(e) => handlePriceChange(filters.min_price, e.target.value ? Number(e.target.value) : undefined)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>
    </div>
  );
}
