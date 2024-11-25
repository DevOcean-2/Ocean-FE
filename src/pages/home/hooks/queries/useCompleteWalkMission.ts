import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { walkApi } from '../../apis/walk/walk';

export const useCompleteWalkMission = (missionType: 'LANDMARK' | 'TREASURE_HUNT') => {
  return useMutation({
    mutationKey: queryKeys.walk.completeWalkingMission(missionType),
    mutationFn: () => walkApi.completeWalkMission({ missionType }),
  });
};
