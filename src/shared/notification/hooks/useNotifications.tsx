import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationStorage } from '../notification';
import { NotificationType } from '../types/NotificationType';

export function useNotifications(type: NotificationType | 'ALL' = 'ALL') {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: NotificationStorage.getAll,
    select: (data: any) =>
      type === 'ALL' ? data : data.filter((notification: any) => notification.type === type),
  });

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
    markAsRead: markAsRead.mutate,
    deleteNotification: deleteMutation.mutate,
  };
}
