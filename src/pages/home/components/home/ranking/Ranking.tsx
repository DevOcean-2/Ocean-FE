import { ICON_ARROW_RIGHT, ICON_RANKING } from '@/assets/svgs';
import { ViewStyle, TextStyle } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { RankingItem } from './RankingItem';
import { Card } from '../../frame';

export const Ranking = () => {
  const month = new Date().getMonth() + 1;

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ICON_RANKING />
          <Text style={styles.titleText}>{`${month}월 강남구 산책왕`}</Text>
        </View>
        <ICON_ARROW_RIGHT />
      </View>

      <View style={styles.rankingList}>
        <RankingItem rank={1} username="유저 닉네임 길어졌을 때에는 ellipsis 처리" distance={100} />
        <RankingItem rank={2} username="유저 닉네임" distance={200} />
        <RankingItem rank={3} username="유저 닉네임2" distance={300} />
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
