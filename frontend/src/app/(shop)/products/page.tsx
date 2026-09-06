"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductSearch } from "@/components/products/ProductSearch";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { ProductFilterParams } from "@/types/product";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category_id");
  const initialSearch = searchParams.get("search");

  const [filters, setFilters] = useState<ProductFilterParams>({
    category_id: initialCategory ? Number(initialCategory) : undefined,
    search: initialSearch || "",
    sort: "newest",
  });

  useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({ ...prev, category_id: Number(initialCategory) }));
    }
    if (initialSearch) {
      setFilters((prev) => ({ ...prev, search: initialSearch }));
    }
  }, [initialCategory, initialSearch]);

  const { data: productsData, isLoading: productsLoading } = useProducts(filters);
  const { data: categories = [] } = useCategories();

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
  };

  const handleReset = () => {
    setFilters({ sort: "newest" });
  };

  const products = productsData?.data || [];
  const total = productsData?.total || products.length;

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              All Products
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {products.length} of {total} products
            </p>
          </div>

          <ProductSearch initialValue={filters.search} onSearch={handleSearch} />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilter
              categories={categories}
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
            />
          </div>

          {/* Grid */}
          <div className="lg:col-span-3">
            <ProductGrid products={products} isLoading={productsLoading} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-400">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
