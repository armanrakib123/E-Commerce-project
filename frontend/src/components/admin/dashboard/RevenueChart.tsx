import React from "react";
import { formatCurrency } from "@/lib/formatCurrency";

interface ChartPoint {
  month: string;
  revenue: number;
  orders: number;
}

interface RevenueChartProps {
  data: ChartPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Revenue Analytics</h3>
          <p className="text-xs text-slate-500 mt-0.5">Monthly revenue & transaction performance</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-600" />
            <span className="text-slate-500">Revenue</span>
          </div>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 pt-8 pb-2">
        {data.map((point) => {
          const heightPercent = Math.round((point.revenue / maxRevenue) * 100);
          return (
            <div key={point.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold bg-slate-900 text-white rounded-md px-1.5 py-0.5 mb-1 whitespace-nowrap shadow">
                {formatCurrency(point.revenue)} ({point.orders} orders)
              </div>

              {/* Bar */}
              <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden h-full flex items-end">
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full bg-gradient-to-t from-purple-700 to-indigo-500 rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                />
              </div>

              <span className="text-xs font-semibold text-slate-500 mt-1">{point.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
