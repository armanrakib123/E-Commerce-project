import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface ShippingData {
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  notes?: string;
}

interface ShippingFormProps {
  data: ShippingData;
  onChange: (field: keyof ShippingData, value: string) => void;
  errors?: Partial<Record<keyof ShippingData, string>>;
}

export function ShippingForm({ data, onChange, errors }: ShippingFormProps) {
  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-5">
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
        1. Shipping Address & Contact
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          placeholder="e.g. Alex Morgan"
          value={data.shipping_name}
          onChange={(e) => onChange("shipping_name", e.target.value)}
          error={errors?.shipping_name}
        />

        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. alex@example.com"
          value={data.shipping_email}
          onChange={(e) => onChange("shipping_email", e.target.value)}
          error={errors?.shipping_email}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number *"
          placeholder="e.g. +1 (555) 000-0000"
          value={data.shipping_phone}
          onChange={(e) => onChange("shipping_phone", e.target.value)}
          error={errors?.shipping_phone}
        />

        <Input
          label="City / District *"
          placeholder="e.g. New York or Dhaka"
          value={data.shipping_city}
          onChange={(e) => onChange("shipping_city", e.target.value)}
          error={errors?.shipping_city}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Street Address *"
            placeholder="House, street, apartment, suite"
            value={data.shipping_address}
            onChange={(e) => onChange("shipping_address", e.target.value)}
            error={errors?.shipping_address}
          />
        </div>

        <Input
          label="Postal Code *"
          placeholder="e.g. 10001"
          value={data.shipping_postal_code}
          onChange={(e) => onChange("shipping_postal_code", e.target.value)}
          error={errors?.shipping_postal_code}
        />
      </div>

      <Textarea
        label="Delivery Notes (Optional)"
        placeholder="Any specific delivery instructions, gate code, or preferred timing..."
        value={data.notes || ""}
        onChange={(e) => onChange("notes", e.target.value)}
        rows={2}
      />
    </div>
  );
}
