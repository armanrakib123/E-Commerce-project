import api from "../api";
import { Order } from "@/types/order";
import { ApiResponse } from "@/types/api";
import { ENABLE_MOCK_FALLBACK } from "@/lib/constants";
import { mockOrders, mockProducts } from "../mockData";

export interface DashboardStats {
  total_revenue: number;
  revenue_growth: number;
  total_orders: number;
  orders_growth: number;
  total_products: number;
  total_customers: number;
  recent_orders: Order[];
  revenue_chart: { month: string; revenue: number; orders: number }[];
}

export const adminDashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await api.get<ApiResponse<DashboardStats> | DashboardStats>("/admin/dashboard");
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as DashboardStats;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        return {
          total_revenue: 128450.0,
          revenue_growth: 14.8,
          total_orders: 842,
          orders_growth: 9.2,
          total_products: mockProducts.length,
          total_customers: 389,
          recent_orders: mockOrders,
          revenue_chart: [
            { month: "Jan", revenue: 14200, orders: 95 },
            { month: "Feb", revenue: 18900, orders: 120 },
            { month: "Mar", revenue: 16400, orders: 110 },
            { month: "Apr", revenue: 22100, orders: 145 },
            { month: "May", revenue: 27800, orders: 180 },
            { month: "Jun", revenue: 29050, orders: 192 },
          ],
        };
      }
      throw error;
    }
  },
};
