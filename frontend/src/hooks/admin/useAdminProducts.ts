import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminProductService, AdminProductPayload } from "@/services/admin/product.service";

export function useAdminProducts(params?: { search?: string; category_id?: number; page?: number }) {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["admin", "products", params],
    queryFn: () => adminProductService.getProducts(params),
  });

  const createMutation = useMutation({
    mutationFn: (formData: FormData | AdminProductPayload) => adminProductService.createProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number | string; formData: FormData | AdminProductPayload }) =>
      adminProductService.updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (id: number | string) => adminProductService.toggleProductStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => adminProductService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    products: productsQuery.data?.data || [],
    total: productsQuery.data?.total || 0,
    isLoading: productsQuery.isLoading,
    refetch: productsQuery.refetch,
    createProduct: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateProduct: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    toggleStatus: toggleStatusMutation.mutateAsync,
    deleteProduct: deleteMutation.mutateAsync,
  };
}
