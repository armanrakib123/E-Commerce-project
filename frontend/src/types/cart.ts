import { Product } from "./product";

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
  created_at?: string;
  updated_at?: string;
}

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  item_count: number;
}
