import { View } from 'react-native-ui-lib';
import { PositionInfo } from '../components/home/location';
import { MissionCarousel } from '../components/home/mission';
import { ProfileImage } from '../components/home/profile';
import { Ranking } from '../components/home/ranking';
import { Recommend, RecommendFeed } from '../components/home/recommend';

export const Home = () => {
  return (
    <View
      style={{ width: '100%', height: '100%', backgroundColor: '#EDF1F7', paddingHorizontal: 20 }}
    >
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
