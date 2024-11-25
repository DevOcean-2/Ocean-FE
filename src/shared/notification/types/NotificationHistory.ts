import { NotificationStatus } from './NotificationStatus';
import { NotificationType } from './NotificationType';

export interface NotificationHistory {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  status: NotificationStatus;
  data?: any;
  sentAt: Date;
  isRead: boolean;
}
