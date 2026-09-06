import { create } from "zustand";
import { CartItem } from "@/types/cart";
import { cartService } from "@/services/cart.service";

interface CartState {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  subtotal: 0,
  total: 0,
  itemCount: 0,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const data = await cartService.getCart();
      set({
        items: data.items || [],
        subtotal: data.subtotal || 0,
        total: data.total || 0,
        itemCount: data.item_count || data.items?.reduce((s, i) => s + i.quantity, 0) || 0,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  addItem: async (productId: number, quantity: number = 1) => {
    set({ isLoading: true });
    try {
      const data = await cartService.addToCart(productId, quantity);
      set({
        items: data.items || [],
        subtotal: data.subtotal || 0,
        total: data.total || 0,
        itemCount: data.item_count || data.items?.reduce((s, i) => s + i.quantity, 0) || 0,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  updateQuantity: async (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      await get().removeItem(itemId);
      return;
    }
    try {
      const data = await cartService.updateCartItem(itemId, quantity);
      set({
        items: data.items || [],
        subtotal: data.subtotal || 0,
        total: data.total || 0,
        itemCount: data.item_count || data.items?.reduce((s, i) => s + i.quantity, 0) || 0,
      });
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  },

  removeItem: async (itemId: number) => {
    try {
      const data = await cartService.removeCartItem(itemId);
      set({
        items: data.items || [],
        subtotal: data.subtotal || 0,
        total: data.total || 0,
        itemCount: data.item_count || data.items?.reduce((s, i) => s + i.quantity, 0) || 0,
      });
    } catch (err) {
      console.error("Failed to remove cart item:", err);
    }
  },

  clearCart: () => {
    set({ items: [], subtotal: 0, total: 0, itemCount: 0 });
  },
}));
