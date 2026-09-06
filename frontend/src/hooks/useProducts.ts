import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { ProductFilterParams } from "@/types/product";

export function useProducts(params?: ProductFilterParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.getProducts(params),
    staleTime: 1000 * 60 * 2, // 2 mins
  });
}
