import api from "./api";
import { CartItem, CartResponse } from "@/types/cart";
import { ApiResponse } from "@/types/api";
import { ENABLE_MOCK_FALLBACK, STORAGE_KEYS } from "@/lib/constants";
import { mockCartItems, mockProducts } from "./mockData";

export const cartService = {
  async getCart(): Promise<CartResponse> {
    try {
      const response = await api.get<ApiResponse<CartResponse> | CartResponse>("/cart");
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as CartResponse;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        let items: CartItem[] = [];
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem(STORAGE_KEYS.CART);
          if (saved) {
            try {
              items = JSON.parse(saved);
            } catch {
              items = mockCartItems;
            }
          } else {
            items = mockCartItems;
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
          }
        }
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
          items,
          subtotal,
          total: subtotal,
          item_count: items.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
      throw error;
    }
  },

  async addToCart(productId: number, quantity: number = 1): Promise<CartResponse> {
    try {
      const response = await api.post<ApiResponse<CartResponse> | CartResponse>("/cart", {
        product_id: productId,
        quantity,
      });
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as CartResponse;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        let items: CartItem[] = [];
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem(STORAGE_KEYS.CART);
          items = saved ? JSON.parse(saved) : [...mockCartItems];
        }
        const existingIndex = items.findIndex((i) => i.product_id === productId);
        if (existingIndex > -1) {
          items[existingIndex].quantity += quantity;
        } else {
          const product = mockProducts.find((p) => p.id === productId) || mockProducts[0];
          items.push({
            id: Date.now(),
            product_id: productId,
            quantity,
            price: product.price,
            product,
          });
        }
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
        }
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
          items,
          subtotal,
          total: subtotal,
          item_count: items.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
      throw error;
    }
  },

  async updateCartItem(cartItemId: number, quantity: number): Promise<CartResponse> {
    try {
      const response = await api.put<ApiResponse<CartResponse> | CartResponse>(`/cart-items/${cartItemId}`, {
        quantity,
      });
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as CartResponse;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        let items: CartItem[] = [];
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem(STORAGE_KEYS.CART);
          items = saved ? JSON.parse(saved) : [...mockCartItems];
          const item = items.find((i) => i.id === cartItemId);
          if (item) {
            item.quantity = Math.max(1, quantity);
          }
          localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
        }
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
          items,
          subtotal,
          total: subtotal,
          item_count: items.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
      throw error;
    }
  },

  async removeCartItem(cartItemId: number): Promise<CartResponse> {
    try {
      const response = await api.delete<ApiResponse<CartResponse> | CartResponse>(`/cart-items/${cartItemId}`);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as CartResponse;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        let items: CartItem[] = [];
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem(STORAGE_KEYS.CART);
          items = saved ? JSON.parse(saved) : [...mockCartItems];
          items = items.filter((i) => i.id !== cartItemId);
          localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
        }
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
          items,
          subtotal,
          total: subtotal,
          item_count: items.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
      throw error;
    }
  },
};
