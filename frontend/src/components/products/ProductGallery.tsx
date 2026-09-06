"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images?: string[];
  mainImage?: string;
  name: string;
}

export function ProductGallery({ images = [], mainImage, name }: ProductGalleryProps) {
  const allImages = images.length > 0 ? images : [mainImage || "/images/products/placeholder.png"];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] scrollbar-none py-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                selectedImage === img
                  ? "border-indigo-600 ring-2 ring-indigo-600/20"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <Image src={img} alt={`${name} thumb ${idx}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Display */}
      <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-inner">
        <Image
          src={selectedImage}
          alt={name}
          fill
          priority
          className="object-contain p-6 transition-all duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}
