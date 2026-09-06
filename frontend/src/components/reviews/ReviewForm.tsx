"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { reviewService } from "@/services/review.service";
import { useAuth } from "@/hooks/useAuth";
import { Review } from "@/types/review";

interface ReviewFormProps {
  productId: number;
  onReviewAdded: (review: Review) => void;
}

export function ReviewForm({ productId, onReviewAdded }: ReviewFormProps) {
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please write a few words about your experience.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const newReview = await reviewService.createReview({
        product_id: productId,
        rating,
        comment: comment.trim(),
      });
      onReviewAdded(newReview);
      setComment("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4"
    >
      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Write a Review</h4>

      {/* Star selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Your Rating
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 text-amber-400 hover:scale-110 transition-transform"
            >
              <Star
                className={`w-6 h-6 ${
                  (hoverRating || rating) >= star
                    ? "fill-current"
                    : "text-slate-200 dark:text-slate-700"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            {rating} out of 5 stars
          </span>
        </div>
      </div>

      <Textarea
        label="Your Feedback"
        placeholder="How was the product quality, performance, and packaging?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        error={error}
      />

      {success && (
        <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl">
          Thank you! Your review has been submitted successfully.
        </p>
      )}

      <Button type="submit" size="sm" isLoading={isSubmitting}>
        Submit Review
      </Button>
    </form>
  );
}
