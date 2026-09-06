import api from "./api";
import { Order, CheckoutPayload } from "@/types/order";
import { ApiResponse } from "@/types/api";
import { ENABLE_MOCK_FALLBACK, STORAGE_KEYS } from "@/lib/constants";
import { mockOrders } from "./mockData";

export const orderService = {
  async getOrders(): Promise<Order[]> {
    try {
      const response = await api.get<ApiResponse<Order[]> | Order[]>("/orders");
      if ("data" in response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        return mockOrders;
      }
      throw error;
    }
  },

  async checkout(payload: CheckoutPayload): Promise<Order> {
    try {
      const response = await api.post<ApiResponse<Order> | Order>("/checkout", payload);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as Order;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const newOrder: Order = {
          id: Date.now(),
          order_number: "ORD-" + Math.floor(10000 + Math.random() * 90000),
          user_id: 1,
          status: "pending",
          total_amount: 449.49,
          subtotal: 449.49,
          tax: 0,
          shipping_fee: 0,
          payment_method: payload.payment_method,
          payment_status: payload.payment_method === "cod" ? "unpaid" : "paid",
          shipping_name: payload.shipping_name,
          shipping_email: payload.shipping_email,
          shipping_phone: payload.shipping_phone,
          shipping_address: payload.shipping_address,
          shipping_city: payload.shipping_city,
          shipping_postal_code: payload.shipping_postal_code,
          notes: payload.notes,
          items: mockOrders[0].items,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        if (typeof window !== "undefined") {
          localStorage.removeItem(STORAGE_KEYS.CART);
        }
        return newOrder;
      }
      throw error;
    }
  },
};
