import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet, Animated, Easing } from 'react-native';
import { useCurrentLocation, useWeather } from '../../../hooks';
import { ICON_POSITION, ICON_REFRESH } from '@/assets/svgs';
import { Image } from '@/src/shared/ui';
import { Card } from '../../frame';
import { useCurrentTown } from '../../../hooks/useCurrentTown';

export const PositionInfo = () => {
  const { location, getCurrentLocation } = useCurrentLocation();
  const { data, isLoading, refetch } = useCurrentTown(location?.latitude, location?.longitude);
  const { data: weatherData } = useWeather(location?.latitude, location?.longitude);
  const weatherMainText = useMemo(() => {
    const weatherType = weatherData?.weather?.[0]?.main ?? '';

    if (weatherType === 'Clear') return '신나게 산책을 떠나볼까요?';
    if (weatherType === 'Clouds') return '반려견과 함께 특별한 시간을 즐겨보세요!';
    if (weatherType === 'Rain') return '우산을 챙겨주세요! 비가 올 예정입니다.';
    if (weatherType === 'Snow') return '눈이 내릴 예정입니다. 따뜻하게 입으세요!';
    return '산책으로 건강한 일상을 만들어요!';
  }, [weatherData]);
  const weatherIcon = weatherData?.weather?.[0]?.icon ?? '알 수 없음';

  const spinValue = React.useRef(new Animated.Value(0)).current;
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // spin animation
  const startSpinAnimation = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  // stop spin animation
  const stopSpinAnimation = () => {
    spinValue.stopAnimation();
    spinValue.setValue(0);
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    startSpinAnimation();

    try {
      await getCurrentLocation();
      await refetch();
    } finally {
      setIsRefreshing(false);
      stopSpinAnimation();
    }
  };

  // 최초 로딩 animation
  useEffect(() => {
    if (isLoading) {
      startSpinAnimation();
    } else {
      stopSpinAnimation();
    }
  }, [isLoading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const isSpinning = isLoading || isRefreshing;

  return (
    <Card style={styles.header}>
      <View style={styles.locationContainer}>
        <View style={styles.locationContents}>
          <ICON_POSITION />
          <Text style={styles.boldText}>{data?.region_2depth_name ?? '알 수 없음'}</Text>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <TouchableOpacity
              onPress={handleRefresh}
              disabled={isSpinning}
              activeOpacity={0.7}
              style={[styles.refreshIcon, isSpinning && styles.disabledIcon]}
            >
              <ICON_REFRESH />
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Text style={styles.weatherText}>{weatherMainText}</Text>
      </View>
      <View>
        <Image
          source={{ uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` }}
          style={styles.weatherIcon}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 600,
  },
  locationContents: { display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' },
  locationContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 'auto',
    gap: 6,
  },
  refreshIcon: {
    padding: 8,
  },
  disabledIcon: {
    opacity: 0.7,
  },
  picker: {
    fontSize: 16,
    color: '#20303C',
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  weatherText: {
    fontSize: 14,
    color: '#8F9BB3',
    fontWeight: '400',
    lineHeight: 19.6,
  },
  weatherIcon: {
    width: 42,
    height: 42,
    borderRadius: 100,
    color: 'white',
    verticalAlign: 'middle',
    textAlign: 'center',
  },
});
