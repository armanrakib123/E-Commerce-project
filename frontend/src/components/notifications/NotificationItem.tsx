import React from "react";
import { Notification } from "@/types/notification";
import { formatDate } from "@/lib/formatDate";
import { Bell, Check, Trash2, Info, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
  onMarkRead?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export function NotificationItem({ notification, onMarkRead, onDelete }: NotificationItemProps) {
  const isUnread = !notification.read_at;

  const getIcon = () => {
    switch (notification.type) {
      case "order_status":
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case "promotion":
        return <Bell className="w-4 h-4 text-amber-600" />;
      default:
        return <Info className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 p-3.5 rounded-xl transition-all duration-150 border",
        isUnread
          ? "bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/40"
          : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"
      )}
    >
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className={cn("text-xs font-semibold truncate", isUnread ? "text-indigo-950 dark:text-indigo-200" : "text-slate-800 dark:text-slate-200")}>
            {notification.title}
          </h4>
          <span className="text-[10px] text-slate-400 shrink-0">
            {formatDate(notification.created_at)}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {notification.message}
        </p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {isUnread && onMarkRead && (
          <button
            onClick={() => onMarkRead(notification.id)}
            title="Mark as read"
            className="p-1 text-slate-400 hover:text-indigo-600 rounded"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(notification.id)}
            title="Delete notification"
            className="p-1 text-slate-400 hover:text-rose-600 rounded"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
