"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { OrderList } from "@/components/orders/OrderList";
import { useOrders } from "@/hooks/useOrders";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from "lucide-react";

function OrdersContent() {
  const searchParams = useSearchParams();
  const placed = searchParams.get("placed");
  const orderId = searchParams.get("order_id");

  const { orders, isLoading } = useOrders();

  return (
    <div className="py-8 sm:py-12">
      <Container className="space-y-8">
        {/* Success Banner if redirected from checkout */}
        {placed && (
          <div className="rounded-3xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/80 dark:bg-emerald-950/40 p-6 sm:p-8 flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold text-emerald-950 dark:text-emerald-200">
                Order Placed Successfully!
              </h2>
              <p className="text-sm text-emerald-800 dark:text-emerald-300 mt-1">
                Thank you for your order {orderId ? `#${orderId}` : ""}. A confirmation notification has been sent. You can track its fulfillment status below.
              </p>
            </div>
          </div>
        )}

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track fulfillment, review purchases, and view transaction history
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-44 w-full rounded-3xl" />
            <Skeleton className="h-44 w-full rounded-3xl" />
          </div>
        ) : (
          <OrderList orders={orders} />
        )}
      </Container>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-400">Loading orders...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
