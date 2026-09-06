import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  growth?: number;
  icon: React.ReactNode;
  subtitle?: string;
}

export function StatsCard({ title, value, growth, icon, subtitle }: StatsCardProps) {
  const isPositive = growth !== undefined && growth >= 0;

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{value}</div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          {growth !== undefined && (
            <span
              className={`flex items-center font-bold ${
                isPositive ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {Math.abs(growth)}%
            </span>
          )}
          <span className="text-slate-400">{subtitle || "vs previous period"}</span>
        </div>
      </div>
    </div>
  );
}
