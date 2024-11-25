import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationStorage } from '../notification';
import { NotificationType } from '../types/NotificationType';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export function useNotifications(type: NotificationType | 'ALL' = 'ALL') {
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: NotificationStorage.getAll,
    select: (data: any) =>
      type === 'ALL' ? data : data.filter((notification: any) => notification.type === type),
    staleTime: 0,
  });

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(() => {
      refetch();
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(() => {
      refetch();
    });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, [refetch]); // refetch를 의존성 배열에 추가

  const markAsRead = useMutation({
    mutationFn: NotificationStorage.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: NotificationStorage.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    notifications,
    isLoading,
    refetch,
    markAsRead: markAsRead.mutate,
    deleteNotification: deleteMutation.mutate,
  };
}
