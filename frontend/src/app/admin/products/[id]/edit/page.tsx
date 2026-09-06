"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { useAdminProducts } from "@/hooks/admin/useAdminProducts";
import { useCategories } from "@/hooks/useCategories";
import { adminProductService } from "@/services/admin/product.service";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function AdminEditProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["admin", "product", id],
    queryFn: () => adminProductService.getProduct(id),
    enabled: !!id,
  });

  const { updateProduct, isUpdating } = useAdminProducts();
  const { data: categories = [] } = useCategories();

  const handleSubmit = async (formData: FormData) => {
    await updateProduct({ id, formData });
    router.push("/admin/products");
  };

  if (productLoading) {
    return (
      <div className="max-w-4xl space-y-6">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <Skeleton className="h-12 w-96 rounded-xl" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/products"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-purple-600 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Products Inventory
        </Link>
      </div>

      <AdminHeader
        title={`Edit Product #${id}`}
        description={`Modify details and inventory settings for ${product?.name || "this item"}`}
      />

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <ProductForm
          initialData={product}
          categories={categories}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
        />
      </div>
    </div>
  );
}
