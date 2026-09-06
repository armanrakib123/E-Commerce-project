import api from "./api";
import { Category } from "@/types/category";
import { ApiResponse } from "@/types/api";
import { ENABLE_MOCK_FALLBACK } from "@/lib/constants";
import { mockCategories } from "./mockData";

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get<ApiResponse<Category[]> | Category[]>("/categories");
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

  async getCategory(idOrSlug: string | number): Promise<Category | null> {
    try {
      const response = await api.get<ApiResponse<Category> | Category>(`/categories/${idOrSlug}`);
      if ("data" in response.data && response.data.data) {
        return response.data.data;
      }
      return response.data as Category;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const found = mockCategories.find(
          (c) => c.id.toString() === idOrSlug.toString() || c.slug === idOrSlug.toString()
        );
        if (found) return found;
      }
      throw error;
    }
  },
};
