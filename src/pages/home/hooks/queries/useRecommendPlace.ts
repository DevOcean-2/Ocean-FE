import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { walkApi } from '../../apis/walk/walk';

export const useRecommendPlace = () => {
  return useQuery({
    queryKey: queryKeys.walk.recommendPlace,
    queryFn: () => walkApi.getRecommendPlace(),
  });
};
