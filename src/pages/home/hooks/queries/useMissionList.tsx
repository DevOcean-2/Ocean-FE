import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { missionApi } from '../../apis/mission/mission';

export const useMissionList = () => {
  return useQuery({
    queryKey: queryKeys.mission.getMission,
    queryFn: () => missionApi.getMission(),
  });
};
