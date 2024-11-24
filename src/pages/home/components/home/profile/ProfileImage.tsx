import React, { useEffect } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { Image } from '@/src/shared/ui';
import { useHomeParameter, useMyInformation } from '../../../hooks';

export const ProfileImage: React.FC = () => {
  const { data } = useMyInformation();
  const { updateMyRanking } = useHomeParameter();

  const tempDistance = data?.walkDistance ?? 100;
  const tempRank = data?.highestRank ?? 11;

  useEffect(() => {
    updateMyRanking(tempRank);
  }, [tempRank]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data?.profileImage ?? '',
        }}
        style={styles.profileImage}
      />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.nameText}>{data?.dogName}</Text>
          <Text style={styles.breedText}>{data?.dogBreed}</Text>
        </View>
        <View>
          <View style={styles.statContainer}>
            <Text style={styles.statLabel}>누적 산책 거리</Text>
            <Text style={styles.statValue}>{tempDistance} KM</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statLabel}>최고 랭킹</Text>
            <Text style={styles.statValue}>{tempRank} 위</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: 120,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  } as ViewStyle,

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
  } as ImageStyle,

  infoContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: 20,
    paddingVertical: 16,
  } as ViewStyle,

  nameText: {
    color: '#101426',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  } as TextStyle,

  breedText: {
    color: '#8F9BB3',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 24,
  } as TextStyle,

  statContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  } as ViewStyle,

  statLabel: {
    color: '#8F9BB3',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 15,
  } as TextStyle,

  statValue: {
    color: '#101426',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 15,
  } as TextStyle,
};
