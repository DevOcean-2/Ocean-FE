import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { walkApi } from '../../apis/walk/walk';

export const useStartMission = (missionType: 'FEED' | 'LANDMARK' | 'TREASURE_HUNT') => {
  return useMutation({
    mutationKey: queryKeys.walk.startWalk(missionType),
    mutationFn: () => walkApi.startMission({ missionType }),
  });
};
