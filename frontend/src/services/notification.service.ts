import api from "./api";
import { Notification } from "@/types/notification";
import { ApiResponse } from "@/types/api";
import { ENABLE_MOCK_FALLBACK } from "@/lib/constants";
import { mockNotifications } from "./mockData";

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await api.get<ApiResponse<Notification[]> | Notification[]>("/notifications");
      if ("data" in response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return [];
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        return mockNotifications;
      }
      throw error;
    }
  },

  async markAsRead(id: string | number): Promise<void> {
    try {
      await api.post(`/notifications/${id}/read`);
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const notif = mockNotifications.find((n) => n.id.toString() === id.toString());
        if (notif) notif.read_at = new Date().toISOString();
        return;
      }
      throw error;
    }
  },

  async markAllAsRead(): Promise<void> {
    try {
      await api.post("/notifications/mark-all-read");
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        mockNotifications.forEach((n) => (n.read_at = new Date().toISOString()));
        return;
      }
      throw error;
    }
  },

  async deleteNotification(id: string | number): Promise<void> {
    try {
      await api.delete(`/notifications/${id}`);
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const idx = mockNotifications.findIndex((n) => n.id.toString() === id.toString());
        if (idx > -1) mockNotifications.splice(idx, 1);
        return;
      }
      throw error;
    }
  },

  async testNotification(): Promise<Notification> {
    try {
      const response = await api.post("/notifications/test");
      const resData = response.data;
      if (resData && typeof resData === "object" && "data" in resData && resData.data) {
        return resData.data as Notification;
      }
      return resData as Notification;
    } catch (error) {
      if (ENABLE_MOCK_FALLBACK) {
        const newNotif: Notification = {
          id: "notif-" + Date.now(),
          type: "test",
          title: "System Test Notification",
          message: "Real-time notification test event dispatched successfully.",
          read_at: null,
          created_at: new Date().toISOString(),
        };
        mockNotifications.unshift(newNotif);
        return newNotif;
      }
      throw error;
    }
  },
};
