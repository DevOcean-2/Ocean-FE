import { Image } from '@/src/shared/ui';
import React from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { View, Text, ViewProps } from 'react-native-ui-lib';
import { LikeBadge } from '../badge/LikeBadge';

interface FeedInfoGridProps extends ViewProps {
  items: { id: string; imageUrl: string; title: string; likeCount?: number }[];
  numColumns?: number;
}

export const FeedInfoGrid = (props: FeedInfoGridProps) => {
  const { items, numColumns = 3, ...rest } = props;

  return (
    <View {...rest} style={styles.container}>
      {items.map((item) => (
        <View key={item.id} style={{ width: `${100 / numColumns}%` }}>
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            {item.likeCount && (
              <View row centerV style={styles.badgeContainer}>
                <LikeBadge count={item.likeCount} />
              </View>
            )}
          </View>
          <Text text80 numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  } as ViewStyle,

  itemContainer: {
    aspectRatio: 1,
  } as ViewStyle,

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  } as ImageStyle,

  badgeContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  } as ViewStyle,

  title: {
    marginTop: 4,
  } as TextStyle,
};
