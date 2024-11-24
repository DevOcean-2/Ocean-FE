import React, { useMemo } from 'react';
import { View, Text, Carousel, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { useMissionList, useMissions } from '../../../hooks';
import { ICON_ARROW_RIGHT, ICON_FLAG } from '@/assets/svgs';
import { Card } from '../../frame';
import { MissionItem } from './MissionItem';
import { PublicWalkEntryLink } from '@/src/shared/constants';
import { useRouter } from 'expo-router';

/**
 * 1. 내 활동 조회 연동
 * 2. walking days 찾기 연동
 * 3. 인기 피드에서 해당 피드로 이동 (마이홈으로 리다이렉트)
 * 4. 추천장소 api 나오면 연동
 * 5. 산책 랭킹 피드에서 해당 피드로 이동 (마이홈으로 리다이렉트)
 * 6. 산책 시작
 * 7. 산책 완료
 * 8. 산책 완료 시 사진 업로드 기능 구현
 *
 *
 * @returns
 */

export const MissionCarousel = () => {
  const { missionList, missionPageIndex, setMissionPageIndex } = useMissions();

  const month = useMemo(() => new Date().getMonth() + 1, []);
  const { data } = useMissionList();

  const router = useRouter();

  const gotoActivityPage = () => router.push(PublicWalkEntryLink.walkActivity);

  return (
    <Card style={{ marginBottom: 20 }}>
      <TouchableOpacity onPress={gotoActivityPage}>
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
      </TouchableOpacity>
      <Carousel
        pageControlProps={{ currentPage: missionPageIndex, numOfPages: missionList.length }}
        onChangePage={(newPageIndex, oldPageINdex, info) => {
          setMissionPageIndex(newPageIndex);
        }}
        pageControlPosition="under"
      >
        {data?.map((mission, index) => (
          <MissionItem
            key={`${mission}-${index}`}
            mission={mission.missionName}
            missionType={mission.missionType}
            missionProgressType={mission.missionProgressType as 'READY' | 'PROGRESS' | 'COMPLETE'}
            missionId={mission.missionId}
            percent={mission.percent}
            onPress={gotoActivityPage}
          />
        )) ?? []}
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
