import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '../apis/weather';
import { queryKeys } from '../apis/queryKeys';

export const useWeather = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: queryKeys.walk.currentWeather,
    queryFn: () => {
      if (!lat || !lon) throw new Error('위치 정보가 필요합니다.');
      return weatherApi.getCurrentWeather(lat, lon);
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 5, // 5분 주기로 갱신
  });
};
