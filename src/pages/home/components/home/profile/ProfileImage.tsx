import React from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { Image } from '@/src/shared/ui';

export const ProfileImage: React.FC = () => (
  <View style={styles.container}>
    <Image
      source={{
        uri: 'https://img.freepik.com/free-photo/friendly-smart-basenji-dog-giving-his-paw-close-up-isolated-white_346278-1626.jpg?t=st=1729658603~exp=1729662203~hmac=c93172aa7d60615eabe095b7c6353c75adf2fb686c981abcbd21acded998134e&w=1800',
      }}
      style={styles.profileImage}
    />
    <View style={styles.infoContainer}>
      <View>
        <Text style={styles.nameText}>강아지 이름</Text>
        <Text style={styles.breedText}>견종</Text>
      </View>
      <View>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>누적 산책 거리</Text>
          <Text style={styles.statValue}>100KM</Text>
        </View>
        <View style={styles.statContainer}>
          <Text style={styles.statLabel}>최고 랭킹</Text>
          <Text style={styles.statValue}>1위</Text>
        </View>
      </View>
    </View>
  </View>
);

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
