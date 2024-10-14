import { useState } from 'react';

export const useMissions = () => {
  const [missionList] = useState<string[]>(['완주', '10000보', '석촌호수']);
  const [missionPageIndex, setMissionPageIndex] = useState<number>(0);

  return { missionList, missionPageIndex, setMissionPageIndex };
};
