"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: product, isLoading, isError } = useProduct(slug);
  const { data: relatedData } = useProducts({
    category_id: product?.category_id,
  });

  const relatedProducts = (relatedData?.data || [])
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  if (isLoading) {
    return (
      <Container className="py-12 space-y-8">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square w-full rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <Skeleton className="h-6 w-1/4 rounded-lg" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-12 w-1/2 rounded-xl" />
          </div>
        </div>
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container className="py-20 text-center">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Product Not Found</h2>
        <p className="mt-2 text-sm text-slate-500">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Return to Store
        </Link>
      </Container>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <Container className="space-y-14">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-slate-900 dark:hover:text-white">
            Products
          </Link>
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                href={`/categories/${product.category_id}`}
                className="hover:text-slate-900 dark:hover:text-white"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 dark:text-white truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Details Section */}
        <ProductDetails product={product} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              You May Also Like
            </h3>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </Container>
    </div>
  );
}
