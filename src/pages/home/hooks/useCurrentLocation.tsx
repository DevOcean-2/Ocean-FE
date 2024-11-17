import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('위치 불러오기 실패: 위치 권한이 거부되었습니다.');
        setError('위치 권한이 거부되었습니다.');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (err) {
      console.error('위치를 가져올 수 없습니다.');
      setError('위치를 가져올 수 없습니다.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, error, getCurrentLocation };
};
