import { Image } from '@/src/shared/ui';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native-ui-lib';

interface RankingItemProps {
  rank: number;
  username: string;
  distance: number;
  userId: string;
  profileImageUrl: string;
  selected?: boolean;
}

export const RankingItem = (props: RankingItemProps) => {
  const { rank, username, distance, userId, selected = false, profileImageUrl } = props;

  const imageURI =
    (profileImageUrl?.length ?? 0 > 0)
      ? profileImageUrl
      : 'https://img.freepik.com/free-photo/friendly-smart-basenji-dog-giving-his-paw-close-up-isolated-white_346278-1626.jpg?t=st=1729658603~exp=1729662203~hmac=c93172aa7d60615eabe095b7c6353c75adf2fb686c981abcbd21acded998134e&w=1800';

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('해당 user의 피드로 이동한다.');
      }}
    >
      <View style={selected ? styles.selectedContainer : styles.container}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.rankNumber}>{rank}</Text>
          <Image
            source={{
              uri: imageURI,
            }}
            style={styles.profileImage}
          />
          <Text numberOfLines={1} style={styles.username}>
            {username}
          </Text>
        </View>
        <Text style={styles.distance}>{`${distance} km`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,

  selectedContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#a5ecc3',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
  } as ViewStyle,

  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  } as ViewStyle,

  rankNumber: {
    color: '#04C755',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  } as TextStyle,

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  } as ImageStyle,

  username: {
    width: 150,
    color: '#101426',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
  } as TextStyle,

  distance: {
    color: '#101426',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
  } as TextStyle,
};
