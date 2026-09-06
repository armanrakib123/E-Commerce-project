import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });
}

export function useProductSummary(id: number | string) {
  return useQuery({
    queryKey: ["product-summary", id],
    queryFn: () => productService.getProductSummary(id),
    enabled: !!id,
  });
}
