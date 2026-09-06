import api from "../api";
import { Order } from "@/types/order";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { ENABLE_MOCK_FALLBACK } from "@/lib/constants";
import { mockOrders } from "../mockData";

export interface UpdateOrderStatusPayload {
  status: string;
  payment_status?: string;
}

export const adminOrderService = {
  async getOrders(params?: { status?: string; search?: string; page?: number }): Promise<PaginatedResponse<Order>> {
    try {
      const response = await api.get<PaginatedResponse<Order> | ApiResponse<Order[]> | Order[]>("/admin/orders", {
        params,
      });
      const resData = response.data;
      if (Array.isArray(resData)) {
        return { data: resData, total: resData.length };
      }
      if ("data" in resData && Array.isArray(resData.data)) {
        return {
          data: resData.data,
          total: "total" in resData && typeof resData.total === "number" ? resData.total : resData.data.length,
          current_page: "current_page" in resData && typeof resData.current_page === "number" ? resData.current_page : 1,
        };
      }
      return { data: [], total: 0 };
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        let list = [...mockOrders];
        if (params?.status) {
          list = list.filter((o) => o.status.toLowerCase() === params.status?.toLowerCase());
        }
        if (params?.search) {
          const q = params.search.toLowerCase();
          list = list.filter(
            (o) =>
              (o.order_number && o.order_number.toLowerCase().includes(q)) ||
              o.shipping_name.toLowerCase().includes(q)
          );
        }
        return { data: list, total: list.length, current_page: 1 };
      }
      throw error;
    }
  },

  async updateOrderStatus(orderId: number | string, payload: UpdateOrderStatusPayload): Promise<Order> {
    try {
      const response = await api.put<ApiResponse<Order> | Order>(`/admin/orders/${orderId}`, payload);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as Order;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const order = mockOrders.find((o) => o.id.toString() === orderId.toString());
        if (order) {
          order.status = payload.status;
          if (payload.payment_status) order.payment_status = payload.payment_status;
          order.updated_at = new Date().toISOString();
          return order;
        }
      }
      throw error;
    }
  },
};
