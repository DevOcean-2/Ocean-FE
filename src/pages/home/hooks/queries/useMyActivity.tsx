import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { missionApi } from '../../apis/mission/mission';

export const useMyActivity = (date: string /* YYYY-MM-DD */) => {
  return useQuery({
    queryKey: queryKeys.mission.myActivity(date),
    queryFn: () => missionApi.getMyActivities(date),
  });
};
