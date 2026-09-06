"use client";

import React from "react";
import { Modal } from "@/components/ui/modal";
import { ProductForm } from "./ProductForm";
import { Category } from "@/types/category";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
}

export function CreateProductModal({
  isOpen,
  onClose,
  categories,
  onSubmit,
  isLoading,
}: CreateProductModalProps) {
  const handleSubmit = async (formData: FormData) => {
    await onSubmit(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Product"
      description="Add a new item to your catalog with pricing, stock, and imagery."
      maxWidth="2xl"
    >
      <ProductForm
        categories={categories}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  );
}
