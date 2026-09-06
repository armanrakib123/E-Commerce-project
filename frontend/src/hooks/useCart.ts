import { useEffect } from "react";
import { useCartStore } from "@/store/cart.store";

export function useCart() {
  const { items, subtotal, total, itemCount, isLoading, fetchCart, addItem, updateQuantity, removeItem, clearCart } =
    useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    items,
    subtotal,
    total,
    itemCount,
    isLoading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  };
}
