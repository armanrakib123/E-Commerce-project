import { useQuery } from "@tanstack/react-query";
import { adminDashboardService } from "@/services/admin/dashboard.service";

export function useDashboard() {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => adminDashboardService.getDashboardStats(),
    staleTime: 1000 * 60 * 2,
  });
}
