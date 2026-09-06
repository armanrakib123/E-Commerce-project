"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";
import { ProductTable } from "@/components/admin/products/ProductTable";
import { CreateProductModal } from "@/components/admin/products/CreateProductModal";
import { useAdminProducts } from "@/hooks/admin/useAdminProducts";
import { useCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    products,
    total,
    isLoading,
    createProduct,
    isCreating,
    toggleStatus,
    deleteProduct,
  } = useAdminProducts({ search, category_id: categoryId });

  const { data: categories = [] } = useCategories();

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Products Inventory"
        description={`Manage ${total} catalog products, prices, stock, and store availability`}
        action={
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsCreateOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
            <Link href="/admin/products/create">
              <Button variant="outline" size="md">
                Full Page Form
              </Button>
            </Link>
          </div>
        }
      />

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <select
          value={categoryId || ""}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : undefined)}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      ) : (
        <ProductTable
          products={products}
          onToggleStatus={toggleStatus}
          onDeleteProduct={deleteProduct}
        />
      )}

      {/* Modal */}
      <CreateProductModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        categories={categories}
        onSubmit={async (fd) => {
          await createProduct(fd);
        }}
        isLoading={isCreating}
      />
    </div>
  );
}
