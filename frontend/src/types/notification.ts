export interface Notification {
  id: string | number;
  type?: string;
  title: string;
  message: string;
  read_at: string | null;
  created_at: string;
  data?: Record<string, unknown>;
}

export interface NotificationResponse {
  data: Notification[];
  unread_count: number;
}
