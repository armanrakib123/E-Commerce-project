import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function Loader({ className, size = "md", text }: LoaderProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 gap-3", className)}>
      <Loader2 className={cn("animate-spin text-indigo-600 dark:text-indigo-400", sizes[size])} />
      {text && <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{text}</p>}
    </div>
  );
}
