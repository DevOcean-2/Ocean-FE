import { Carousel, TouchableOpacity } from 'react-native-ui-lib';
import { useMissionList, useMissions } from '../../hooks';
import { MissionItem } from '../home/mission';
import { useRouter } from 'expo-router';
import { PublicWalkEntryLink } from '@/src/shared/constants';

export const CurrentMissionCarousel = () => {
  const { missionList, missionPageIndex, setMissionPageIndex } = useMissions();
  const router = useRouter();

  const { data } = useMissionList();
  return (
    <Carousel
      pageControlProps={{ currentPage: missionPageIndex, numOfPages: missionList.length }}
      onChangePage={(newPageIndex, oldPageINdex, info) => {
        setMissionPageIndex((prev) => newPageIndex);
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
          onPress={() => router.push(PublicWalkEntryLink.walkActivity)}
        />
      )) ?? []}
    </Carousel>
  );
};
