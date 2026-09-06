"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShippingForm, ShippingData } from "./ShippingForm";
import { PaymentMethod } from "./PaymentMethod";
import { OrderSummary } from "./OrderSummary";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart.store";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { Lock, AlertCircle } from "lucide-react";

export function CheckoutForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCartStore();
  const { checkout, isCheckingOut } = useOrders();

  const [shippingData, setShippingData] = useState<ShippingData>({
    shipping_name: user?.name || "",
    shipping_email: user?.email || "",
    shipping_phone: user?.phone || "",
    shipping_address: user?.address || "",
    shipping_city: "Springfield",
    shipping_postal_code: "97477",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});
  const [submitError, setSubmitError] = useState("");

  const handleFieldChange = (field: keyof ShippingData, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ShippingData, string>> = {};
    if (!shippingData.shipping_name.trim()) errs.shipping_name = "Full name is required";
    if (!shippingData.shipping_email.trim()) errs.shipping_email = "Email is required";
    if (!shippingData.shipping_phone.trim()) errs.shipping_phone = "Phone number is required";
    if (!shippingData.shipping_address.trim()) errs.shipping_address = "Street address is required";
    if (!shippingData.shipping_city.trim()) errs.shipping_city = "City is required";
    if (!shippingData.shipping_postal_code.trim()) errs.shipping_postal_code = "Postal code is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) {
      setSubmitError("Your cart is empty. Add items before placing an order.");
      return;
    }

    setSubmitError("");

    try {
      const order = await checkout({
        ...shippingData,
        payment_method: paymentMethod,
        items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
      });
      clearCart();
      router.push(`/orders?placed=true&order_id=${order.id}`);
    } catch (err: unknown) {
      setSubmitError("Failed to complete checkout. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 Cols: Shipping & Payment */}
      <div className="lg:col-span-2 space-y-6">
        <ShippingForm
          data={shippingData}
          onChange={handleFieldChange}
          errors={errors}
        />

        <PaymentMethod
          selected={paymentMethod}
          onChange={setPaymentMethod}
        />

        {submitError && (
          <div className="flex items-center gap-2 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}
      </div>

      {/* Right Col: Order Summary & Place Order */}
      <div className="space-y-6">
        <OrderSummary items={items} subtotal={subtotal} />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isCheckingOut}
          disabled={items.length === 0}
          className="w-full gap-2 rounded-2xl shadow-lg shadow-indigo-500/20 py-4 text-base"
        >
          <Lock className="w-4 h-4" />
          Place Order & Pay
        </Button>
      </div>
    </form>
  );
}
