import { Product } from "./product";
import { User } from "./user";

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: number;
  order_number?: string;
  user_id: number;
  user?: User;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | string;
  total_amount: number;
  subtotal?: number;
  tax?: number;
  shipping_fee?: number;
  payment_method: string;
  payment_status?: string;
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city?: string;
  shipping_postal_code?: string;
  notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CheckoutPayload {
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city?: string;
  shipping_postal_code?: string;
  payment_method: string;
  notes?: string;
  items?: { product_id: number; quantity: number }[];
}
