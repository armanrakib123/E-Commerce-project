import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/category";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-900 p-6 shadow-sm hover:shadow-xl transition-all duration-300 min-h-[220px]"
    >
      {/* Background Image */}
      <Image
        src={category.image || "/images/banners/hero-1.jpg"}
        alt={category.name}
        fill
        className="object-cover object-center opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-1 text-xs text-slate-300 line-clamp-1">{category.description}</p>
        )}
        <div className="mt-3 flex items-center justify-between text-xs font-semibold text-indigo-300 group-hover:text-white transition-colors">
          <span>{category.products_count !== undefined ? `${category.products_count} Products` : "Explore Catalog"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
