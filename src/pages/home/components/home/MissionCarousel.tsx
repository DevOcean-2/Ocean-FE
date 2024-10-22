import React from 'react';
import { View, Text, Carousel, PageControl } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { MissionItem } from './MissionItem';
import { useMissions } from '../../hooks';

export const MissionCarousel = () => {
  const { missionList, missionPageIndex, setMissionPageIndex } = useMissions();

  return (
    <View>
      <Text style={styles.sectionTitle}>추천 미션</Text>
      <View style={styles.carouselContainer}>
        <Carousel onChangePage={setMissionPageIndex}>
          {missionList.map((mission, index) => (
            <MissionItem key={`${mission}-${index}`} mission={mission} />
          ))}
        </Carousel>
        <PageControl
          currentPage={missionPageIndex}
          numOfPages={missionList.length}
          color="#D2D6D8"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 16,
    height: 24,
    verticalAlign: 'middle',
    marginBottom: 12,
  },
  carouselContainer: {
    marginBottom: 37,
  },
});
