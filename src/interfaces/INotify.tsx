export interface INotify {
  notificationId: string;
  userId: string;
  notificationType: number;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}
