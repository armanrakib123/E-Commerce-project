"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon } from "lucide-react";

interface ProductFormProps {
  initialData?: Product;
  categories: Category[];
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
}

export function ProductForm({ initialData, categories, onSubmit, isLoading }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [comparePrice, setComparePrice] = useState(initialData?.compare_price?.toString() || "");
  const [stock, setStock] = useState(initialData?.stock?.toString() || "10");
  const [categoryId, setCategoryId] = useState(initialData?.category_id?.toString() || (categories[0]?.id?.toString() || "1"));
  const [isActive, setIsActive] = useState(initialData?.is_active !== undefined ? !!initialData.is_active : true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Product title is required";
    if (!price || Number(price) <= 0) newErrors.price = "Valid price is required";
    if (!stock || Number(stock) < 0) newErrors.stock = "Stock count is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (comparePrice) formData.append("compare_price", comparePrice);
    formData.append("stock", stock);
    formData.append("category_id", categoryId);
    formData.append("is_active", isActive ? "1" : "0");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic info */}
        <div className="space-y-4">
          <Input
            label="Product Name *"
            placeholder="e.g. Wireless Noise-Cancelling Headphones"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price ($) *"
              type="number"
              step="0.01"
              placeholder="99.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={errors.price}
              required
            />

            <Input
              label="Compare at Price ($)"
              type="number"
              step="0.01"
              placeholder="129.99"
              value={comparePrice}
              onChange={(e) => setComparePrice(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Stock Quantity *"
              type="number"
              placeholder="25"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              error={errors.stock}
              required
            />

            <Select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
            />
          </div>

          <Textarea
            label="Description"
            placeholder="Comprehensive description and specs of this product..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        {/* Media & Status */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Product Image
          </label>

          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-purple-500 transition-colors">
            {imagePreview ? (
              <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                <Image src={imagePreview} alt="Preview" fill className="object-contain" />
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-slate-400">
                <ImageIcon className="w-12 h-12 mb-2" />
                <p className="text-xs">No image selected</p>
              </div>
            )}

            <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 px-4 py-2 text-xs font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-100">
              <Upload className="w-4 h-4" />
              <span>Choose Image File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer">
              Product is Active & Visible in Store
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button type="submit" variant="primary" size="md" isLoading={isLoading} className="bg-purple-600 hover:bg-purple-700">
          {initialData ? "Save Changes" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
