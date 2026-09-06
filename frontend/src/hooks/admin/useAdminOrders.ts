import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminOrderService, UpdateOrderStatusPayload } from "@/services/admin/order.service";

export function useAdminOrders(params?: { status?: string; search?: string; page?: number }) {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["admin", "orders", params],
    queryFn: () => adminOrderService.getOrders(params),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number | string; payload: UpdateOrderStatusPayload }) =>
      adminOrderService.updateOrderStatus(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    orders: ordersQuery.data?.data || [],
    total: ordersQuery.data?.total || 0,
    isLoading: ordersQuery.isLoading,
    refetch: ordersQuery.refetch,
    updateStatus: updateStatusMutation.mutateAsync,
    isUpdating: updateStatusMutation.isPending,
  };
}
