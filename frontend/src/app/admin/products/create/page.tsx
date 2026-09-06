"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { useAdminProducts } from "@/hooks/admin/useAdminProducts";
import { useCategories } from "@/hooks/useCategories";
import { ArrowLeft } from "lucide-react";

export default function AdminCreateProductPage() {
  const router = useRouter();
  const { createProduct, isCreating } = useAdminProducts();
  const { data: categories = [] } = useCategories();

  const handleSubmit = async (formData: FormData) => {
    await createProduct(formData);
    router.push("/admin/products");
  };

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
        title="Add New Catalog Product"
        description="Configure product specifications, pricing, stock levels, and upload primary imagery"
      />

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          isLoading={isCreating}
        />
      </div>
    </div>
  );
}
