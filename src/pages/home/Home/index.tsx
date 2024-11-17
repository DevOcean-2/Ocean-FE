import { View } from 'react-native-ui-lib';
import { PositionInfo } from '../components/home/location';
import { MissionCarousel } from '../components/home/mission';
import { ProfileImage } from '../components/home/profile';
import { Ranking } from '../components/home/ranking';
import { Recommend, RecommendFeed } from '../components/home/recommend';
import { useCurrentLocation } from '../hooks';

export const Home = () => {
  const { location, getCurrentLocation } = useCurrentLocation();

  return (
    <View
      style={{ width: '100%', height: '100%', backgroundColor: '#EDF1F7', paddingHorizontal: 20 }}
    >
      <PositionInfo location={location} getCurrentLocation={getCurrentLocation} />
      <ProfileImage />
      <Ranking location={location} />
      <View>
        <MissionCarousel />
        <Recommend location={location} />
        <RecommendFeed />
      </View>
    </View>
  );
};
