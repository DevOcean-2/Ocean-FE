import React, { useMemo } from 'react';
import { View, Text, Carousel } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { useMissions } from '../../../hooks';
import { ICON_ARROW_RIGHT, ICON_FLAG } from '@/assets/svgs';
import { Card } from '../../frame';
import { MissionItem } from './MissionItem';

export const MissionCarousel = () => {
  const { missionList, missionPageIndex, setMissionPageIndex } = useMissions();

  const month = useMemo(() => new Date().getMonth() + 1, []);

  return (
    <Card style={{ marginBottom: 20 }}>
      <View
        style={{
          display: 'flex',
          height: 24,
          flexDirection: 'row',
          gap: 6,
          alignItems: 'flex-start',
          marginBottom: 16,
        }}
      >
        <ICON_FLAG />
        <Text style={styles.sectionTitle}>{`${month}월 미션`}</Text>
        <ICON_ARROW_RIGHT style={{ marginLeft: 'auto' }} />
      </View>
      <Carousel
        pageControlProps={{ currentPage: missionPageIndex, numOfPages: missionList.length }}
        onChangePage={(newPageIndex, oldPageINdex, info) => {
          setMissionPageIndex((prev) => newPageIndex);
        }}
        pageControlPosition="under"
      >
        {missionList.map((mission, index) => (
          <MissionItem key={`${mission}-${index}`} mission={mission} />
        ))}
      </Carousel>
    </Card>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20,
    height: 24,
    verticalAlign: 'middle',
    marginBottom: 12,
  },
});
