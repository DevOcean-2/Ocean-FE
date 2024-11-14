import { Carousel } from 'react-native-ui-lib';
import { useMissions } from '../../hooks';
import { MissionItem } from '../home/mission';

export const CurrentMissionCarousel = () => {
  const { missionList, missionPageIndex, setMissionPageIndex } = useMissions();
  return (
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
  );
};
