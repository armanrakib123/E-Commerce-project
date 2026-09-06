import { User } from "./user";

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  user?: User;
  rating: number;
  comment: string;
  created_at: string;
  updated_at?: string;
}

export interface CreateReviewPayload {
  product_id: number;
  rating: number;
  comment: string;
}
