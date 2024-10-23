import { ICON_FIRE } from '@/assets/svgs';
import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

interface LikeBadgeProps {
  count: number;
}

export const LikeBadge = ({ count }: LikeBadgeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ICON_FIRE fill="#04C755" />
        <Text style={styles.text}>{count.toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#CCFCE3',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  } as ViewStyle,

  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  } as ViewStyle,

  text: {
    color: '#101426',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
  } as TextStyle,
};
