import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { missionApi } from '../../apis/mission/mission';

export const useCheckMission = (missionType: 'TREASURE_HUNT' | 'LANDMARK') => {
  if (missionType === 'LANDMARK') {
    return useMutation({
      mutationKey: queryKeys.mission.checkLandMarkMission,
      mutationFn: (position: { latitude: number; longitude: number }) =>
        missionApi.checkLandMarkMission(position),
    });
  } else {
    return useMutation({
      mutationKey: queryKeys.mission.checkTreasureHuntMission,
      mutationFn: (position: { latitude: number; longitude: number }) =>
        missionApi.checkTreasureHuntMission(position),
    });
  }
};
