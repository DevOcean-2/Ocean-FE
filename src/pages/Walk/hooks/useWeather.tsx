import { useState } from 'react';

export const useWeather = () => {
  const [weatherText] = useState<string>('산책하기 좋은 날씨네요!');
  return { weatherText };
};
