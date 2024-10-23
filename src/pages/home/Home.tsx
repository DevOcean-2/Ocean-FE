import { View } from 'react-native-ui-lib';
import { Recommend, RecommendFeed } from './components/home/recommend';
import { MissionCarousel } from './components/home/mission';
import { ProfileImage } from './components/home/profile';
import { PositionInfo } from './components/home/location';
import { Ranking } from './components/home/ranking';

export const Home = () => {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <PositionInfo />
      <ProfileImage />
      <Ranking />

      <View>
        <MissionCarousel />
        <Recommend />
        <RecommendFeed />
      </View>
    </View>
  );
};
