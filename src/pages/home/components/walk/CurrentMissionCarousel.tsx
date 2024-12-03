import { Carousel, TouchableOpacity } from 'react-native-ui-lib';
import { useMissionList, useMissions } from '../../hooks';
import { MissionItem } from '../home/mission';
import { useRouter } from 'expo-router';
import { PublicWalkEntryLink } from '@/src/shared/constants';
import { useAtom } from 'jotai';
import { sampleMissionList } from '../home/atom';

export const CurrentMissionCarousel = () => {
  const { missionList, missionPageIndex, setMissionPageIndex } = useMissions();
  const router = useRouter();

  // const { data } = useMissionList();

  const [data] = useAtom(sampleMissionList);
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
          missionType={mission.missionType as 'LANDMARK' | 'TREASURE_HUNT'}
          missionProgressType={mission.missionProgressType as 'READY' | 'PROGRESS' | 'COMPLETE'}
          missionId={mission.missionId}
          percent={mission.percent}
          onPress={() => router.push(PublicWalkEntryLink.walkActivity)}
        />
      )) ?? []}
    </Carousel>
  );
};
