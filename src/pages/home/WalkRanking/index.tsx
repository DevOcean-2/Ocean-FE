import { View, Text } from 'react-native-ui-lib';
import { MainLayout } from '../components/frame';
import { WalkRankingHeader } from './WalkRankingHeader';
import { RankingItem } from '../components/home/ranking';
import { useWalkRanking } from '../hooks';
import { ScrollView, ViewStyle } from 'react-native';

export const WalkRanking = () => {
  const { data: rankingList } = useWalkRanking();

  const realRankingList = [
    ...(rankingList ?? []),
    ...[
      { nickName: '쿠키', totalDistance: 300, userId: '100', profileImageUrl: '' },
      { nickName: '치즈', totalDistance: 200, userId: '99', profileImageUrl: '' },
      { nickName: '단팥', totalDistance: 100, userId: '98', profileImageUrl: '' },
      { nickName: '콩이', totalDistance: 55, userId: '97', profileImageUrl: '' },
      { nickName: '뚱이', totalDistance: 54, userId: '96', profileImageUrl: '' },
      { nickName: '스폰지밥', totalDistance: 53, userId: '95', profileImageUrl: '' },
      { nickName: '다람이', totalDistance: 48, userId: '94', profileImageUrl: '' },
      { nickName: '짱구', totalDistance: 47, userId: '93', profileImageUrl: '' },
      { nickName: '바둑이', totalDistance: 43, userId: '92', profileImageUrl: '' },
      { nickName: '콩콩이', totalDistance: 22, userId: '91', profileImageUrl: '' },
      { nickName: '드럼이', totalDistance: 11, userId: '90', profileImageUrl: '' },
      { nickName: '쿵쿵이', totalDistance: 10, userId: '89', profileImageUrl: '' },
      { nickName: '통통이', totalDistance: 9, userId: '88', profileImageUrl: '' },
      { nickName: '팡팡이', totalDistance: 5, userId: '87', profileImageUrl: '' },
      { nickName: '징징이', totalDistance: 4, userId: '86', profileImageUrl: '' },
      { nickName: '랑이', totalDistance: 0, userId: '85', profileImageUrl: '' },
    ],
  ];

  const myRankingInformation = realRankingList?.[10] ?? null;

  const totalCount = realRankingList?.length ?? 0;
  const currentDate = `${new Date().getFullYear()}.${new Date().getMonth() + 1}.${new Date().getDate()} 기준`;

  return (
    <MainLayout header={<WalkRankingHeader />}>
      <ScrollView style={styles.container}>
        <View style={styles.contentStyle}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#101828',
              }}
            >
              {`총 ${totalCount} 명`}
            </Text>
            <Text style={{ marginLeft: 'auto', fontSize: 13, fontWeight: '400', color: '#8F9BB3' }}>
              {currentDate}
            </Text>
          </View>
          <View style={styles.rankingList}>
            <View style={{ marginBottom: 20 }}>
              <RankingItem
                key={`current-${10}`}
                selected
                rank={11}
                username={myRankingInformation?.nickName ?? '닉네임 없음'}
                distance={myRankingInformation?.totalDistance ?? 0}
                userId={myRankingInformation?.userId ?? ''}
                profileImageUrl={myRankingInformation?.profileImageUrl ?? ''}
              />
            </View>

            {realRankingList?.map((ranking, index) => (
              <RankingItem
                key={index}
                rank={index + 1}
                username={ranking?.nickName ?? '닉네임 없음'}
                distance={ranking.totalDistance}
                userId={ranking.userId}
                profileImageUrl={ranking.profileImageUrl}
              />
            )) ?? []}
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    height: '100%',
  } as ViewStyle,

  contentStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    height: '100%',
  } as ViewStyle,

  rankingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  } as ViewStyle,
};
