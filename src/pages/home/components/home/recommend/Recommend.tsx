import { ViewStyle, TextStyle, Alert } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { Card } from '../../frame';
import { ICON_ARROW_RIGHT, ICON_PIN } from '@/assets/svgs';
import { LocationInfoGrid } from '../../grid/LocationInfoGrid';
import { useRecommendPlace } from '../../../hooks';

const MOCK_CAFE_IMAGE =
  'https://img.freepik.com/free-photo/friendly-smart-basenji-dog-giving-his-paw-close-up-isolated-white_346278-1626.jpg?t=st=1729658603~exp=1729662203~hmac=c93172aa7d60615eabe095b7c6353c75adf2fb686c981abcbd21acded998134e&w=1800';

interface RecommendProps {
  location: { latitude?: number; longitude?: number } | null;
}

export const Recommend: React.FC<RecommendProps> = (props) => {
  const { location } = props;
  const { data } = useRecommendPlace();
  return (
    <Card style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          // @TODO 장소
          Alert.alert('기다려주세요!', '장소 서비스 개발중입니다.');
        }}
      >
        <View style={styles.header}>
          <ICON_PIN fill="#04C755" />
          <Text style={styles.title}>이 근처 추천장소</Text>
          <ICON_ARROW_RIGHT style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        {data?.map((place, index) => (
          <LocationInfoGrid
            key={`${place.address}-${index}`}
            name={place.name}
            images={place.pictures}
            address={place.address}
            categories={[place.category]}
            distance={place.distance}
          />
        )) ?? []}
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

  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  } as ViewStyle,
};
