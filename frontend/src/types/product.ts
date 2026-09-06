import { Category } from "./category";
import { Review } from "./review";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compare_price?: number;
  discount_percent?: number;
  stock: number;
  is_active?: boolean | number;
  featured?: boolean | number;
  image?: string;
  images?: string[];
  category_id?: number;
  category?: Category;
  rating?: number;
  reviews_count?: number;
  reviews?: Review[];
  created_at?: string;
  updated_at?: string;
}

export interface ProductSummary {
  id: number;
  name: string;
  average_rating: number;
  total_reviews: number;
  rating_distribution?: Record<number, number>;
}

export interface ProductFilterParams {
  category_id?: number | string;
  search?: string;
  min_price?: number;
  max_price?: number;
  sort?: "price_asc" | "price_desc" | "newest" | "rating" | string;
  page?: number;
  per_page?: number;
}
