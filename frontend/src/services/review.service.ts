import api from "./api";
import { Review, CreateReviewPayload } from "@/types/review";
import { ApiResponse } from "@/types/api";
import { ENABLE_MOCK_FALLBACK } from "@/lib/constants";
import { mockCustomerUser } from "./mockData";

export const reviewService = {
  async createReview(payload: CreateReviewPayload): Promise<Review> {
    try {
      const response = await api.post<ApiResponse<Review> | Review>("/reviews", payload);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as Review;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        return {
          id: Date.now(),
          product_id: payload.product_id,
          user_id: mockCustomerUser.id,
          user: mockCustomerUser,
          rating: payload.rating,
          comment: payload.comment,
          created_at: new Date().toISOString(),
        };
      }
      throw error;
    }
  },
};
