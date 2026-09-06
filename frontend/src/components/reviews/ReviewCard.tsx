import React from "react";
import { Review } from "@/types/review";
import { formatDate } from "@/lib/formatDate";
import { Star } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950 font-bold text-sm text-indigo-700 dark:text-indigo-300">
            {review.user?.name ? review.user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {review.user?.name || "Verified Customer"}
            </h5>
            <span className="text-xs text-slate-400">{formatDate(review.created_at)}</span>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-slate-200 dark:text-slate-700"}`}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{review.comment}</p>
    </div>
  );
}
