import { atom } from 'jotai';

export const sampleMissionList = atom([
  {
    missionName: '롯데타워 방문하기',
    missionType: 'LANDMARK',
    count: 0,
    complete: false,
    completeDate: '',
    missionId: 1,
    missionProgressType: 'PROGRESS',
    percent: '0',
    userMissionId: 9,
  },
  {
    missionName: '석촌동 보물찾기',
    missionType: 'TREASURE_HUNT',
    count: 0,
    complete: false,
    completeDate: '',
    missionId: 2,
    missionProgressType: 'PROGRESS',
    percent: '0',
    userMissionId: 7,
  },
]);
