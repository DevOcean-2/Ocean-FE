import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { walkApi } from '../../apis/walk/walk';

export const useWalkRanking = () => {
  return useQuery({
    queryKey: queryKeys.walk.ranking,
    queryFn: () => walkApi.getWalkRanking(),
  });
};
