import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../apis/queryKeys';
import { walkApi } from '../../apis/walk/walk';

export const useRecommendFeed = () => {
  return useQuery({
    queryKey: queryKeys.walk.recommendFeed,
    queryFn: () => walkApi.getRecommendFeed(),
  });
};
