import { useState } from 'react';

export const useMissions = () => {
  // @TODO: mission list는 임의의 리스트에서 랜덤하게 뽑아야함. 서버에서 가져올지, 클라이언트에서 관리할 지는 논의 필요
  const [missionList] = useState<string[]>(['완주', '10000보', '석촌호수']);
  const [missionPageIndex, setMissionPageIndex] = useState<number>(0);

  return { missionList, missionPageIndex, setMissionPageIndex };
};
