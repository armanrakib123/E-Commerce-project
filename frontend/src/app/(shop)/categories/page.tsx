"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { useCategories } from "@/hooks/useCategories";

export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="py-8 sm:py-12">
      <Container className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Store Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Product Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse our curated collections engineered for design, audio, and performance.
          </p>
        </div>

        <CategoryGrid categories={categories} isLoading={isLoading} />
      </Container>
    </div>
  );
}
