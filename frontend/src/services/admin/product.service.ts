import api from "../api";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { ENABLE_MOCK_FALLBACK } from "@/lib/constants";
import { mockProducts, mockCategories } from "../mockData";

export interface AdminProductPayload {
  name: string;
  slug?: string;
  description?: string;
  price: number;
  compare_price?: number;
  stock: number;
  category_id?: number;
  is_active?: boolean | number;
  featured?: boolean | number;
  image?: File | string | null;
}

export const adminProductService = {
  async getProducts(params?: { search?: string; category_id?: number; page?: number }): Promise<PaginatedResponse<Product>> {
    try {
      const response = await api.get<PaginatedResponse<Product> | ApiResponse<Product[]> | Product[]>("/admin/products", {
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
        let list = [...mockProducts];
        if (params?.search) {
          const q = params.search.toLowerCase();
          list = list.filter((p) => p.name.toLowerCase().includes(q));
        }
        if (params?.category_id) {
          list = list.filter((p) => p.category_id === Number(params.category_id));
        }
        return { data: list, total: list.length, current_page: 1 };
      }
      throw error;
    }
  },

  async getProduct(id: number | string): Promise<Product> {
    try {
      const response = await api.get<ApiResponse<Product> | Product>(`/admin/products/${id}`);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as Product;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const found = mockProducts.find((p) => p.id.toString() === id.toString());
        if (found) return found;
      }
      throw error;
    }
  },

  async createProduct(formData: FormData | AdminProductPayload): Promise<Product> {
    try {
      const response = await api.post<ApiResponse<Product> | Product>("/admin/products", formData, {
        headers: formData instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
      });
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as Product;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const name = formData instanceof FormData ? (formData.get("name") as string) : formData.name;
        const price = formData instanceof FormData ? Number(formData.get("price")) : formData.price;
        const stock = formData instanceof FormData ? Number(formData.get("stock")) : formData.stock;
        const description = formData instanceof FormData ? (formData.get("description") as string) : formData.description;
        const categoryId = formData instanceof FormData ? Number(formData.get("category_id")) : formData.category_id;

        const newProd: Product = {
          id: Date.now(),
          name: name || "New Product",
          slug: (name || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          description: description || "",
          price: price || 99.99,
          stock: stock || 10,
          is_active: 1,
          featured: 0,
          image: "/images/products/placeholder.png",
          category_id: categoryId || 1,
          category: mockCategories.find((c) => c.id === categoryId) || mockCategories[0],
          rating: 5.0,
          reviews_count: 0,
          created_at: new Date().toISOString(),
        };
        mockProducts.unshift(newProd);
        return newProd;
      }
      throw error;
    }
  },

  async updateProduct(id: number | string, formData: FormData | AdminProductPayload): Promise<Product> {
    try {
      // In Laravel, file upload update on PUT often requires POST to endpoint
      const response = await api.post<ApiResponse<Product> | Product>(`/admin/products/${id}`, formData, {
        headers: formData instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
      });
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as Product;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const pIndex = mockProducts.findIndex((p) => p.id.toString() === id.toString());
        if (pIndex > -1) {
          const name = formData instanceof FormData ? (formData.get("name") as string) : formData.name;
          const price = formData instanceof FormData ? Number(formData.get("price")) : formData.price;
          const stock = formData instanceof FormData ? Number(formData.get("stock")) : formData.stock;
          if (name) mockProducts[pIndex].name = name;
          if (price) mockProducts[pIndex].price = price;
          if (stock !== undefined) mockProducts[pIndex].stock = stock;
          return mockProducts[pIndex];
        }
      }
      throw error;
    }
  },

  async toggleProductStatus(id: number | string): Promise<Product> {
    try {
      const response = await api.patch<ApiResponse<Product> | Product>(`/admin/products/${id}/toggle-status`);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as Product;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const prod = mockProducts.find((p) => p.id.toString() === id.toString());
        if (prod) {
          prod.is_active = prod.is_active ? 0 : 1;
          return prod;
        }
      }
      throw error;
    }
  },

  async deleteProduct(id: number | string): Promise<void> {
    try {
      await api.delete(`/admin/products/${id}`);
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const idx = mockProducts.findIndex((p) => p.id.toString() === id.toString());
        if (idx > -1) {
          mockProducts.splice(idx, 1);
        }
        return;
      }
      throw error;
    }
  },

  async getDebugCategories(): Promise<Category[]> {
    try {
      const response = await api.get<ApiResponse<Category[]> | Category[]>("/admin/debug/categories");
      if ("data" in response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        return mockCategories;
      }
      throw error;
    }
  },
};
