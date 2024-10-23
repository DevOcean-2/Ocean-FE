import { ViewStyle, TextStyle } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { Card } from '../../frame';
import { FeedInfoGrid } from '../../grid/FeedInfoGrid';
import { ICON_ARROW_RIGHT, ICON_GRID } from '@/assets/svgs';

const MOCK_DOG_IMAGE =
  'https://img.freepik.com/free-photo/friendly-smart-basenji-dog-giving-his-paw-close-up-isolated-white_346278-1626.jpg?t=st=1729658603~exp=1729662203~hmac=c93172aa7d60615eabe095b7c6353c75adf2fb686c981abcbd21acded998134e&w=1800';

const mockFeedItems = [
  {
    id: '1',
    imageUrl: MOCK_DOG_IMAGE,
    title: '두팔이',
    likeCount: 77,
  },
  {
    id: '2',
    imageUrl: MOCK_DOG_IMAGE,
    title: '두식이',
    likeCount: 14,
  },
  {
    id: '3',
    imageUrl: MOCK_DOG_IMAGE,
    title: '나옹이',
    likeCount: 122,
  },
];

export const RecommendFeed = () => {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <ICON_GRID fill="#04C755" />
        <Text style={styles.title}>인기 멍멍이 피드 구경하기</Text>
        <ICON_ARROW_RIGHT style={styles.arrowIcon} />
      </View>
      <FeedInfoGrid items={mockFeedItems} />
    </Card>
  );
};

const styles = {
  container: {
    marginBottom: 24,
  } as ViewStyle,

  header: {
    display: 'flex',
    height: 24,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-start',
    marginBottom: 16,
  } as ViewStyle,

  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
    height: 24,
    verticalAlign: 'middle',
    marginBottom: 12,
  } as TextStyle,

  arrowIcon: {
    marginLeft: 'auto',
  } as ViewStyle,
};
