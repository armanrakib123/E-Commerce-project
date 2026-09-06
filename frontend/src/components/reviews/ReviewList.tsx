"use client";

import React, { useState } from "react";
import { Review } from "@/types/review";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { Star, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewListProps {
  productId: number;
  initialReviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

export function ReviewList({
  productId,
  initialReviews = [],
  averageRating = 4.8,
  totalReviews = initialReviews.length,
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);

  const handleReviewAdded = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header & Rating Breakdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            {averageRating.toFixed(1)}
          </div>
          <div>
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(averageRating)
                      ? "fill-current"
                      : "text-slate-200 dark:text-slate-700"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Based on {totalReviews || reviews.length} customer ratings
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="gap-2 self-start sm:self-auto"
        >
          <MessageSquarePlus className="w-4 h-4" />
          {showForm ? "Cancel Review" : "Write a Review"}
        </Button>
      </div>

      {/* Review Form (collapsible) */}
      {showForm && (
        <ReviewForm productId={productId} onReviewAdded={handleReviewAdded} />
      )}

      {/* Reviews Stream */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-slate-50 dark:bg-slate-900/40 p-6">
            <p className="text-sm text-slate-500">No reviews yet for this product.</p>
            <p className="text-xs text-slate-400 mt-1">Be the first to share your thoughts!</p>
          </div>
        ) : (
          reviews.map((rev) => <ReviewCard key={rev.id} review={rev} />)
        )}
      </div>
    </div>
  );
}
