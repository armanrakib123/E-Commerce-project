"use client";

import React, { useState } from "react";
import { Order } from "@/types/order";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { OrderStatusUpdate } from "./OrderStatusUpdate";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { Edit2, Eye } from "lucide-react";

interface AdminOrderTableProps {
  orders: Order[];
  onUpdateStatus: (id: number | string, status: string, paymentStatus?: string) => Promise<unknown>;
}

export function AdminOrderTable({ orders, onUpdateStatus }: AdminOrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Fulfillment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-bold text-slate-900 dark:text-white">
                {order.order_number || `#${order.id}`}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{order.shipping_name}</p>
                  <p className="text-xs text-slate-400">{order.shipping_phone}</p>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {order.items?.length || 1} items
                </span>
              </TableCell>
              <TableCell className="font-bold text-slate-900 dark:text-white">
                {formatCurrency(order.total_amount)}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">
                    {order.payment_method}
                  </span>
                  <span className="text-[10px] text-slate-400 capitalize">
                    {order.payment_status || "confirmed"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <OrderStatus status={order.status} />
              </TableCell>
              <TableCell className="text-xs text-slate-500">
                {formatDate(order.created_at)}
              </TableCell>
              <TableCell className="text-right">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(order)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Status
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OrderStatusUpdate
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdate={onUpdateStatus}
      />
    </>
  );
}
