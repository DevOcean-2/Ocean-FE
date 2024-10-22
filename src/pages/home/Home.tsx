import { ArrowIOSDownIcon } from '@/components/icons';
import { useCallback } from 'react';
import { View, Text } from 'react-native-ui-lib';
import { HomeHeader, MissionCarousel, ProfileImage } from './components/home';

export const Home = () => {
  const handleClickRecommendPlace = useCallback(() => {
    console.log('장소 추천');
  }, []);

  const handleClickMoveFeed = useCallback(() => {
    console.log('피드 구경');
  }, []);
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <HomeHeader />
      <ProfileImage />

      <View style={{ marginHorizontal: 16 }}>
        <MissionCarousel />
        <View
          style={{
            height: 24,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text
            style={{
              height: '100%',
              fontSize: 18,
              fontWeight: '600',
              verticalAlign: 'middle',
            }}
          >
            장소 추천
          </Text>
          <ArrowIOSDownIcon onPress={handleClickRecommendPlace} />
        </View>

        <View
          style={{
            height: 24,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Text
            style={{
              height: '100%',
              fontSize: 18,
              fontWeight: '600',
              verticalAlign: 'middle',
            }}
          >
            피드 구경가기
          </Text>
          <ArrowIOSDownIcon onPress={handleClickMoveFeed} />
        </View>
      </View>
    </View>
  );
};
