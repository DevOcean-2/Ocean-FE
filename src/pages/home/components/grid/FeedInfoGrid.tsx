import { Image } from '@/src/shared/ui';
import React from 'react';
import { ViewStyle, TextStyle, ImageStyle, ScrollView } from 'react-native';
import { View, Text, ViewProps } from 'react-native-ui-lib';
import { LikeBadge } from '../badge/LikeBadge';

interface FeedInfoGridProps extends ViewProps {
  items: { id: string; imageUrl: string; title: string; likeCount?: number }[];
  numColumns?: number;
}

export const FeedInfoGrid = (props: FeedInfoGridProps) => {
  const { items, numColumns = 3, ...rest } = props;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
    >
      <View {...rest} style={styles.container}>
        {items.map((item, index) => (
          <View
            key={item.id}
            style={[styles.itemWrapper, { marginRight: index !== items.length - 1 ? 12 : 0 }]}
          >
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
    </ScrollView>
  );
};

const styles = {
  scrollView: {
    flexGrow: 0,
  } as ViewStyle,

  scrollContent: {
    paddingRight: 16,
  } as ViewStyle,

  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  } as ViewStyle,

  itemWrapper: {
    width: 120,
  } as ViewStyle,

  itemContainer: {
    aspectRatio: 1,
    position: 'relative',
  } as ViewStyle,

  image: {
    width: 120,
    height: 120,
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
