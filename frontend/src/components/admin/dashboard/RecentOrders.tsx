import React from "react";
import Link from "next/link";
import { Order } from "@/types/order";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Recent Customer Orders</h3>
          <p className="text-xs text-slate-500 mt-0.5">Latest transactions requiring fulfillment</p>
        </div>
        <Link
          href="/admin/orders"
          className="flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
        >
          View All Orders
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.slice(0, 5).map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-bold text-slate-900 dark:text-white">
                {order.order_number || `#${order.id}`}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{order.shipping_name}</p>
                  <p className="text-xs text-slate-400">{order.shipping_email}</p>
                </div>
              </TableCell>
              <TableCell className="text-xs text-slate-500">{formatDate(order.created_at)}</TableCell>
              <TableCell className="font-bold">{formatCurrency(order.total_amount)}</TableCell>
              <TableCell>
                <OrderStatus status={order.status} />
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href="/admin/orders"
                  className="text-xs font-bold text-purple-600 hover:text-purple-700"
                >
                  Manage
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
