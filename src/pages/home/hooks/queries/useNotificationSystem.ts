import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { walkApi } from '../../apis/walk/walk';

export const useNotificationSystem = () => {
  return useQuery({
    queryKey: queryKeys.walk.notification,
    queryFn: () => walkApi.getWalkNotification(),
  });
};
