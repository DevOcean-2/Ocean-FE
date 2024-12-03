import LocalImage from '@/src/shared/ui/LocalImage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';

interface PlaceListProps {
  name: string;
  type: string;
  distance: string;
  address: string;
  images: string[];
}

const PlaceList = ({ name, type, distance, address, images }: PlaceListProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offset / slideSize);
    setActiveIndex(activeIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.placeTitle}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
        </View>
        <View style={styles.subPlaceTitle}>
          <Text style={styles.details}>{distance}</Text>
          <Text style={styles.details}>{address}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
        >
          {images.map((image, index) => (
            <View key={index}>
              <Image source={{ uri: image }} style={{ width: 100, height: 100, marginRight: 10 }} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: index === activeIndex ? '#fff' : 'rgba(255,255,255,0.5)' },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  subPlaceTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pagination: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  info: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#8F9BB3',
    fontWeight: '400',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    fontWeight: '400',

    color: '#222B45',
  },
});

export default PlaceList;
