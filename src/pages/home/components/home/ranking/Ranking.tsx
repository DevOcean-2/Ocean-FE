import { ICON_ARROW_RIGHT, ICON_RANKING } from '@/assets/svgs';
import { ViewStyle, TextStyle } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { RankingItem } from './RankingItem';
import { Card } from '../../frame';
import { useCurrentTown } from '../../../hooks/useCurrentTown';
import { useWalkRanking } from '../../../hooks';

interface RankingProps {
  location: { latitude?: number; longitude?: number } | null;
}

export const Ranking: React.FC<RankingProps> = (props) => {
  const { location } = props;
  const { data } = useCurrentTown(location?.latitude, location?.longitude);
  const month = new Date().getMonth() + 1;

  const { data: rankingList } = useWalkRanking();

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ICON_RANKING />
          <Text
            style={styles.titleText}
          >{`${month}월 ${data?.region_2depth_name ?? '알 수 없음'} 산책왕`}</Text>
        </View>
        <ICON_ARROW_RIGHT />
      </View>

      <View style={styles.rankingList}>
        {/* {rankingList?.map((ranking, index) => (
          <RankingItem
            key={index}
            rank={index + 1}
            username={ranking.nickName}
            distance={ranking.totalDistance}
            userId={ranking.userId}
            profileImageUrl={ranking.profileImageUrl}
          />
        ))} */}
        <RankingItem
          rank={1}
          username="유저 닉네임 길어졌을 때에는 ellipsis 처리"
          userId="1"
          distance={100}
          profileImageUrl=""
        />
        <RankingItem rank={2} username="유저 닉네임" userId="2" distance={200} profileImageUrl="" />
        <RankingItem
          rank={3}
          username="유저 닉네임2"
          userId="3"
          distance={300}
          profileImageUrl=""
        />
      </View>
    </Card>
  );
};

const styles = {
  container: {
    marginBottom: 20,
  } as ViewStyle,

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  } as ViewStyle,

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  } as ViewStyle,

  titleText: {
    color: '#101426',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,

  rankingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  } as ViewStyle,
};
