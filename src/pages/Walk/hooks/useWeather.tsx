import { useState } from 'react';

export const useWeather = () => {
  // @TODO: 날씨 정보를 가져온 후 그에 맞는 텍스트를 반환할 수 있게 변경 되어야 함.
  const [weatherText] = useState<string>('산책하기 좋은 날씨네요!');
  return { weatherText };
};
