import { create } from "zustand";
import { Notification } from "@/types/notification";
import { notificationService } from "@/services/notification.service";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string | number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string | number) => Promise<void>;
  triggerTestNotification: () => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const list = await notificationService.getNotifications();
      const unread = list.filter((n) => !n.read_at).length;
      set({ notifications: list, unreadCount: unread, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      await notificationService.markAsRead(id);
      const updated = get().notifications.map((n) =>
        n.id.toString() === id.toString() ? { ...n, read_at: new Date().toISOString() } : n
      );
      set({
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read_at).length,
      });
    } catch (err) {
      console.error("Failed to mark notification read:", err);
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationService.markAllAsRead();
      const updated = get().notifications.map((n) => ({ ...n, read_at: new Date().toISOString() }));
      set({ notifications: updated, unreadCount: 0 });
    } catch (err) {
      console.error("Failed to mark all notifications read:", err);
    }
  },

  deleteNotification: async (id) => {
    try {
      await notificationService.deleteNotification(id);
      const updated = get().notifications.filter((n) => n.id.toString() !== id.toString());
      set({
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read_at).length,
      });
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  },

  triggerTestNotification: async () => {
    try {
      const newNotif = await notificationService.testNotification();
      set((state) => ({
        notifications: [newNotif, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      }));
    } catch (err) {
      console.error("Failed to trigger test notification:", err);
    }
  },
}));
