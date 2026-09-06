import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCategory(idOrSlug: string | number) {
  return useQuery({
    queryKey: ["category", idOrSlug],
    queryFn: () => categoryService.getCategory(idOrSlug),
    enabled: !!idOrSlug,
  });
}
