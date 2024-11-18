import { Image } from '@/src/shared/ui';
import React from 'react';
import { ViewStyle, TextStyle, ImageStyle, ScrollView } from 'react-native';
import { View, Text, ViewProps } from 'react-native-ui-lib';

interface LocationInfoGridProps extends ViewProps {
  images: string[];
  name: string;
  categories: string[];
  address: string;
  distance?: number;
}

export const LocationInfoGrid = (props: LocationInfoGridProps) => {
  const { images, name, categories, address, distance, ...rest } = props;

  return (
    <View {...rest}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.imageContainer}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={[styles.image, { marginRight: index !== images.length - 1 ? 8 : 0 }]}
          />
        ))}
      </ScrollView>

      <View>
        <View row centerV>
          <Text style={styles.name}>{name}</Text>
          <View row>
            {categories.map((category, index) => (
              <Text
                key={index}
                style={[styles.category, { marginRight: index !== categories.length - 1 ? 4 : 0 }]}
              >
                {`${category}${index !== categories.length - 1 ? ', ' : ''}`}
              </Text>
            ))}
          </View>
        </View>

        <View row centerV marginT-8>
          {distance !== undefined && <Text style={styles.distance}>{`${distance} km`}</Text>}
          <Text style={styles.locationInfo}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  scrollView: {
    marginBottom: 16,
  } as ViewStyle,

  imageContainer: {
    flexDirection: 'row',
  } as ViewStyle,

  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  } as ImageStyle,

  name: {
    color: '#101426',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    marginRight: 8,
  } as TextStyle,

  category: {
    color: '#8F9BB3',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
  } as TextStyle,

  locationInfo: {
    color: '#222B45',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
  } as TextStyle,

  distance: {
    color: '#222B45',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
    marginRight: 8,
  } as TextStyle,
};
