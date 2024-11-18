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
  getAll: async (): Promise<NotificationHistory[]> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * 알림을 저장하고, 스마트폰에 push 알림을 보냅니다.
   *
   * title: 알림 제목
   * body: 알림 내용
   * status: 알림 상태 (성공 알림 SUCCESS, 실패 알림 FAIL)
   * type: 알림 타입 (미션 알림 MISSION, 피드 활동 알림 FEED)
   *
   * @example
   * await NotificationStorage.save({
   *  title: '알림 테스트',
   *  body: '알림 테스트입니다.',
   *  type: 'MISSION',
   *  status: 'SUCCESS',
   * })
   */
  save: async (
    notification: Omit<NotificationHistory, 'id' | 'sentAt' | 'isRead'>,
  ): Promise<void> => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('알림 권한이 거부되었습니다.');
        }
      }

      const notifications = await NotificationStorage.getAll(); // this 대신 NotificationStorage 직접 참조
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
          sound: true,
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Failed to save notification:', error);
    }
  },

  markAsRead: async (id: string): Promise<void> => {
    try {
      const notifications = await NotificationStorage.getAll(); // this 대신 NotificationStorage 직접 참조
      const updatedNotifications = notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification,
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  },

  deleteNotification: async (id: string): Promise<void> => {
    try {
      const notifications = await NotificationStorage.getAll();
      const filteredNotifications = notifications.filter((notification) => notification.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotifications));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  },
};
