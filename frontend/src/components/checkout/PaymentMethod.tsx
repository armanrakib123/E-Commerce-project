import React from "react";
import { PAYMENT_METHODS } from "@/lib/constants";
import { Banknote, CreditCard, Smartphone, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethodProps {
  selected: string;
  onChange: (method: string) => void;
}

export function PaymentMethod({ selected, onChange }: PaymentMethodProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "cod":
        return <Banknote className="w-5 h-5 text-emerald-600" />;
      case "card":
        return <CreditCard className="w-5 h-5 text-indigo-600" />;
      case "bkash":
        return <Smartphone className="w-5 h-5 text-pink-600" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-5">
      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
        2. Payment Method
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PAYMENT_METHODS.map((pm) => {
          const isSelected = selected === pm.id;
          return (
            <div
              key={pm.id}
              onClick={() => onChange(pm.id)}
              className={cn(
                "cursor-pointer rounded-2xl border-2 p-4 transition-all duration-200 flex flex-col justify-between relative",
                isSelected
                  ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                  {getIcon(pm.id)}
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{pm.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{pm.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
