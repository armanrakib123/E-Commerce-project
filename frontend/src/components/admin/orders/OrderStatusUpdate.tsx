"use client";

import React, { useState } from "react";
import { ORDER_STATUS } from "@/lib/constants";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Order } from "@/types/order";

interface OrderStatusUpdateProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number | string, status: string, paymentStatus?: string) => Promise<unknown>;
}

export function OrderStatusUpdate({ order, isOpen, onClose, onUpdate }: OrderStatusUpdateProps) {
  const [status, setStatus] = useState(order?.status || "pending");
  const [paymentStatus, setPaymentStatus] = useState(order?.payment_status || "paid");
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (order) {
      setStatus(order.status);
      setPaymentStatus(order.payment_status || "paid");
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    setIsLoading(true);
    try {
      await onUpdate(order.id, status, paymentStatus);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!order) return null;

  const statusOptions = [
    { label: "Pending", value: ORDER_STATUS.PENDING },
    { label: "Processing", value: ORDER_STATUS.PROCESSING },
    { label: "Shipped", value: ORDER_STATUS.SHIPPED },
    { label: "Delivered", value: ORDER_STATUS.DELIVERED },
    { label: "Cancelled", value: ORDER_STATUS.CANCELLED },
  ];

  const paymentOptions = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid / Pending", value: "unpaid" },
    { label: "Refunded", value: "refunded" },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Update Order ${order.order_number || `#${order.id}`}`}
      description="Change the fulfillment delivery stage and payment status."
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <Select
          label="Fulfillment Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statusOptions}
        />

        <Select
          label="Payment Status"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          options={paymentOptions}
        />

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isLoading} className="bg-purple-600 hover:bg-purple-700">
            Save Status
          </Button>
        </div>
      </form>
    </Modal>
  );
}
