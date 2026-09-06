import api from "./api";
import { Product, ProductFilterParams, ProductSummary } from "@/types/product";
import { PaginatedResponse, ApiResponse } from "@/types/api";
import { ENABLE_MOCK_FALLBACK } from "@/lib/constants";
import { mockProducts } from "./mockData";

export const productService = {
  async getProducts(params?: ProductFilterParams): Promise<PaginatedResponse<Product>> {
    try {
      const response = await api.get<PaginatedResponse<Product> | ApiResponse<Product[]> | Product[]>("/products", {
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
        let filtered = [...mockProducts];
        if (params?.search) {
          const q = params.search.toLowerCase();
          filtered = filtered.filter(
            (p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
          );
        }
        if (params?.category_id) {
          filtered = filtered.filter((p) => p.category_id === Number(params.category_id));
        }
        if (params?.min_price !== undefined) {
          filtered = filtered.filter((p) => p.price >= Number(params.min_price));
        }
        if (params?.max_price !== undefined) {
          filtered = filtered.filter((p) => p.price <= Number(params.max_price));
        }
        if (params?.sort === "price_asc") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (params?.sort === "price_desc") {
          filtered.sort((a, b) => b.price - a.price);
        } else if (params?.sort === "rating") {
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }
        return {
          data: filtered,
          total: filtered.length,
          current_page: 1,
          last_page: 1,
          per_page: 12,
        };
      }
      throw error;
    }
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      const response = await api.get<ApiResponse<Product> | Product>(`/products/${slug}`);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as Product;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const found = mockProducts.find((p) => p.slug === slug || p.id.toString() === slug);
        if (found) return found;
      }
      throw error;
    }
  },

  async getProductSummary(id: number | string): Promise<ProductSummary> {
    try {
      const response = await api.get<ApiResponse<ProductSummary> | ProductSummary>(`/products/${id}/summary`);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as ProductSummary;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const p = mockProducts.find((item) => item.id === Number(id)) || mockProducts[0];
        return {
          id: p.id,
          name: p.name,
          average_rating: p.rating || 4.8,
          total_reviews: p.reviews_count || 12,
          rating_distribution: { 5: 8, 4: 3, 3: 1, 2: 0, 1: 0 },
        };
      }
      throw error;
    }
  },

  async getProductSummaryV2(id: number | string): Promise<ProductSummary> {
    try {
      const response = await api.get<ApiResponse<ProductSummary> | ProductSummary>(`/products/${id}/summary_v2`);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as ProductSummary;
    } catch (error) {
      return this.getProductSummary(id);
    }
  },
};
