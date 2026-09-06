"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useCategory } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default function CategoryDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: category, isLoading: categoryLoading } = useCategory(id);
  const { data: productsData, isLoading: productsLoading } = useProducts({
    category_id: id,
  });

  const products = productsData?.data || [];

  return (
    <div className="py-8 sm:py-12">
      <Container className="space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/categories" className="hover:text-slate-900 dark:hover:text-white">
            Categories
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-white">{category?.name || "Category"}</span>
        </nav>

        {/* Category Header */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm flex flex-col justify-between">
          {categoryLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-64 rounded-lg" />
              <Skeleton className="h-4 w-96 rounded-lg" />
            </div>
          ) : (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Collection
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                {category?.name}
              </h1>
              {category?.description && (
                <p className="mt-2 text-sm text-slate-500 max-w-2xl leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Products in Category */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Available Items ({products.length})
            </h3>
            <Link
              href="/categories"
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Other Categories
            </Link>
          </div>

          <ProductGrid products={products} isLoading={productsLoading} />
        </div>
      </Container>
    </div>
  );
}
