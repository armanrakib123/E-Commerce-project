"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DeleteProductDialog } from "./DeleteProductDialog";
import { formatCurrency } from "@/lib/formatCurrency";
import { Edit, Trash2, CheckCircle2, XCircle } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  onToggleStatus: (id: number | string) => Promise<unknown>;
  onDeleteProduct: (id: number | string) => Promise<unknown>;
}

export function ProductTable({ products, onToggleStatus, onDeleteProduct }: ProductTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await onDeleteProduct(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const isActive = !!product.is_active;
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                      <Image
                        src={product.image || "/images/products/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="font-semibold text-slate-900 dark:text-slate-100 hover:text-purple-600 line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <span className="text-[11px] text-slate-400">ID: #{product.id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {product.category?.name || "General"}
                  </span>
                </TableCell>
                <TableCell className="font-bold text-slate-900 dark:text-white">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-bold ${
                      product.stock > 5 ? "text-slate-700 dark:text-slate-300" : "text-rose-600"
                    }`}
                  >
                    {product.stock} units
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    type="button"
                    onClick={() => onToggleStatus(product.id)}
                    className="flex items-center gap-1.5 focus:outline-none"
                    title="Click to toggle status"
                  >
                    {isActive ? (
                      <Badge variant="success" className="cursor-pointer">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Active
                      </Badge>
                    ) : (
                      <Badge variant="default" className="cursor-pointer">
                        <XCircle className="w-3 h-3 mr-1" /> Inactive
                      </Badge>
                    )}
                  </button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/40 transition"
                      title="Edit product"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(product)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <DeleteProductDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        productName={deleteTarget?.name || ""}
        isLoading={isDeleting}
      />
    </>
  );
}
