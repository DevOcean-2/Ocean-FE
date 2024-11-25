import { useQuery } from '@tanstack/react-query';
import { geocodingApi } from '../apis/geocoding';
import { queryKeys } from '../apis/queryKeys';

export const useCurrentTown = (lat?: number, lng?: number) => {
  return useQuery({
    queryKey: queryKeys.walk.currentTown,
    queryFn: () => {
      if (!lat || !lng) throw new Error('위치 정보가 없습니다.');
      return geocodingApi.getDistrictFromCoords(lat, lng);
    },
    enabled: !!lat && !!lng,
    staleTime: 1000 * 60 * 5, // 5분 주기로 갱신
  });
};
