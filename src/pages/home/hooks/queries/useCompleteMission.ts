import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { walkApi } from '../../apis/walk/walk';

export const useCompleteMission = (
  missionType: 'FEED' | 'LANDMARK' | 'TREASURE_HUNT',
  feedContents?: {
    image_urls: string[];
    content: string;
  },
) => {
  if (missionType === 'FEED') {
    return useMutation({
      mutationKey: queryKeys.walk.completePictureMission('FEED'),
      mutationFn: () =>
        walkApi.completeFeedMission(feedContents ?? { image_urls: [], content: '' }),
    });
  } else {
    return useMutation({
      mutationKey: queryKeys.walk.completeWalkingMission(missionType),
      mutationFn: () => walkApi.completeWalkMission({ missionType }),
    });
  }
};
