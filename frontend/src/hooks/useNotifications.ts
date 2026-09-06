import { useEffect } from "react";
import { useNotificationStore } from "@/store/notification.store";

export function useNotifications() {
  const {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    triggerTestNotification,
  } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    triggerTestNotification,
    refresh: fetchNotifications,
  };
}
