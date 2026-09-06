export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
export const ENABLE_MOCK_FALLBACK = process.env.NEXT_PUBLIC_ENABLE_MOCK_FALLBACK !== "false";

export const STORAGE_KEYS = {
  AUTH_TOKEN: "ecommerce_auth_token",
  USER: "ecommerce_user",
  CART: "ecommerce_guest_cart",
};

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const PAYMENT_METHODS = [
  { id: "cod", name: "Cash on Delivery", description: "Pay with cash upon receiving your order" },
  { id: "card", name: "Credit / Debit Card", description: "Visa, Mastercard, American Express" },
  { id: "bkash", name: "bKash / Mobile Banking", description: "Fast & secure mobile wallet payment" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
];
