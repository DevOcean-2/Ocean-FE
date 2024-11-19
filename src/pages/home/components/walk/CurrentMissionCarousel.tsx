import { Carousel, TouchableOpacity } from 'react-native-ui-lib';
import { useMissions } from '../../hooks';
import { MissionItem } from '../home/mission';
import { useRouter } from 'expo-router';
import { PublicWalkEntryLink } from '@/src/shared/constants';

export const CurrentMissionCarousel = () => {
  const { missionList, missionPageIndex, setMissionPageIndex } = useMissions();
  const router = useRouter();
  return (
    <Carousel
      pageControlProps={{ currentPage: missionPageIndex, numOfPages: missionList.length }}
      onChangePage={(newPageIndex, oldPageINdex, info) => {
        setMissionPageIndex((prev) => newPageIndex);
      }}
      pageControlPosition="under"
    >
      {missionList.map((mission, index) => (
        <TouchableOpacity
          key={`${mission}-${index}`}
          onPress={() => router.push(PublicWalkEntryLink.walkActivity)}
        >
          <MissionItem mission={mission} />
        </TouchableOpacity>
      ))}
    </Carousel>
  );
};
