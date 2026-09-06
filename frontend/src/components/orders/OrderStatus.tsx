import React from "react";
import { Badge } from "@/components/ui/badge";

interface OrderStatusProps {
  status: string;
}

export function OrderStatus({ status }: OrderStatusProps) {
  const normalized = status.toLowerCase();

  switch (normalized) {
    case "delivered":
      return <Badge variant="success">Delivered</Badge>;
    case "shipped":
      return <Badge variant="primary">Shipped</Badge>;
    case "processing":
      return <Badge variant="warning">Processing</Badge>;
    case "cancelled":
      return <Badge variant="danger">Cancelled</Badge>;
    case "pending":
    default:
      return <Badge variant="default">Pending</Badge>;
  }
}
