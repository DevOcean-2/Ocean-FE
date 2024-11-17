import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { NotificationHistory } from './types/NotificationHistory';

const STORAGE_KEY = '@notifications';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      priority: Notifications.AndroidNotificationPriority.HIGH, // Android 우선순위
    }),
  });

export const NotificationStorage = {
  async getAll(): Promise<NotificationHistory[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async save(notification: Omit<NotificationHistory, 'id' | 'sentAt' | 'isRead'>): Promise<void> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('알림 권한이 거부되었습니다.');
        }
      }

      const notifications = await this.getAll();
      const newNotification: NotificationHistory = {
        id: Date.now().toString(),
        sentAt: new Date(),
        isRead: false,
        ...notification,
      };

      notifications.unshift(newNotification);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));

      await Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: { id: newNotification.id },
          sound: true, // 알림음 재생
        },
        trigger: null, // null = 즉시 전송
      });
    } catch (error) {
      console.error('Failed to save notification:', error);
    }
  },

  async markAsRead(id: string): Promise<void> {
    try {
      const notifications = await this.getAll();
      const updatedNotifications = notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification,
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  },
};
