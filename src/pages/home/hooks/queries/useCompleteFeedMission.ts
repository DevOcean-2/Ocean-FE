import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { walkApi } from '../../apis/walk/walk';

export const useCompleteFeedMission = () => {
  return useMutation({
    mutationKey: queryKeys.walk.completePictureMission('FEED'),
    mutationFn: (postId: number) => walkApi.completeFeedMission({ postId }),
  });
};
