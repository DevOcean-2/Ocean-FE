export const queryKeys = {
  walk: {
    ranking: ['w-ranking'] as const, // 산책 랭킹 - Home V
    myInfo: ['w-info'] as const, // 강아지 정보 - Home V
    currentWeather: ['weather'] as const, // 현재 날씨 - Home V
    currentTown: ['town'] as const, // 현재 구 - Home V
    recommendPlace: ['w-place'] as const, // 추천 장소 - Home 요청중
    recommendFeed: ['w-feed'] as const, // 추천 피드 - Home V

    notification: ['w-notification'] as const, // 산책 알림 - Home V
    startWalk: (missionType: 'FEED' | 'TREASURE_HUNT' | 'LANDMARK') =>
      ['w-start', missionType] as const,
    completePictureMission: (missionType: 'FEED') => ['complete-picture', missionType] as const, // 산책 완료 - picture 미션
    completeWalkingMission: (missionType: 'TREASURE_HUNT' | 'LANDMARK') =>
      ['complete-walking', missionType] as const, // 산책 완료 - walking 미션
    endWalk: (missionType: 'FEED' | 'TREASURE_HUNT' | 'LANDMARK') =>
      ['w-end', missionType] as const,
  },
  mission: {
    walkingDays: ['days'] as const, // 해당 연, 월의 산책한 day들, 추후에는 request도 추가해야 함. - Activity
    myActivity: (date: string) => ['activity', date] as const, // 내 활동 조회 - V
    checkLandMarkMission: ['check-landmark'] as const, // 랜드마크 미션 조회 - Home V
    checkTreasureHuntMission: ['check-treasure'] as const, // 보물찾기 미션 조회 - Home
    getMission: ['w-mission'] as const, // 미션 조회 - Home V
    getFeedMission: ['w-feed-mission'] as const, // 피드 미션 조회 - Home V
  },
};
