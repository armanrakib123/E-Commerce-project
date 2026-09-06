"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star } from "lucide-react";

export default function HomePage() {
  const { data: productsData, isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const products = productsData?.data || [];
  const featuredProducts = products.filter((p) => p.featured) || products.slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-8">
        <Container>
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl min-h-[440px] sm:min-h-[520px] flex items-center">
            {/* Background Graphic */}
            <div className="absolute inset-0">
              <Image
                src="/images/banners/hero-1.jpg"
                alt="NovaStore Showcase"
                fill
                priority
                className="object-cover opacity-35 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            </div>

            {/* Banner Content */}
            <div className="relative z-10 p-8 sm:p-14 max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Next-Generation Tech Arrivals 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Engineered for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                  Exceptional Living.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
                Discover curated flagship wireless acoustics, ultra-responsive tactile peripherals,
                and premium minimalist gear designed for digital pioneers.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/products">
                  <Button variant="primary" size="lg" className="rounded-2xl gap-2 shadow-xl shadow-indigo-500/25">
                    Explore Catalog
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button variant="secondary" size="lg" className="rounded-2xl bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md">
                    Shop Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section>
        <Container>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Explore Collections
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Featured Categories
              </h2>
            </div>
            <Link
              href="/categories"
              className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <CategoryGrid categories={categories} isLoading={categoriesLoading} />
        </Container>
      </section>

      {/* Trending / Featured Products */}
      <section>
        <Container>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Top Rated Picks
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                Trending Electronics & Audio
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts.length > 0 ? featuredProducts : products} isLoading={productsLoading} />
        </Container>
      </section>

      {/* Promo Highlight Banner */}
      <section>
        <Container>
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3 py-1 text-xs font-bold">
                  Limited Time Promotion ⚡
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Upgrade Your Workstation Setup
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Enjoy an exclusive 15% discount on all mechanical keyboards, ergonomic audio accessories, and fast charging docks. Use code <b>DISCOUNT10</b> at checkout.
                </p>
                <Link href="/products?category_id=4" className="inline-block pt-2">
                  <Button variant="secondary" size="md" className="rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold">
                    Claim Discount Now
                  </Button>
                </Link>
              </div>

              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/banners/hero-2.jpg"
                  alt="Promo Deal"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
