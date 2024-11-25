import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

interface PlaceListProps {
  name: string;
  type: string;
  distance: string;
  address: string;
  images: string[];
}

const PlaceList = ({ name, type, distance, address, images }: PlaceListProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = Dimensions.get('window').width - 32; // 패딩 고려

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(offset / slideSize);
    setActiveIndex(activeIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
        >
          {images.map((image, index) => (
            <View key={index} style={[styles.imageWrapper, { width: windowWidth }]}>
              {/* <Image source={{ uri: image }} style={styles.image} /> */}
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
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.details}>
          {distance} · {address}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  imageWrapper: {
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlaceList;
