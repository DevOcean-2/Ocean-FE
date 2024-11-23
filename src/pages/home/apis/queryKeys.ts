export const queryKeys = {
  walk: {
    ranking: ['w-ranking'] as const, // 산책 랭킹 - Home V
    myInfo: ['w-info'] as const, // 강아지 정보 - Home V
    currentWeather: ['weather'] as const, // 현재 날씨 - Home V
    currentTown: ['town'] as const, // 현재 구 - Home V
    recommendPlace: ['w-place'] as const, // 추천 장소 - Home 요청중
    recommendFeed: ['w-feed'] as const, // 추천 피드 - Home V

    /** 산책 시작 sse 알림 V */
    /** 사진 업로드 ? */

    completeWalk: ['complete'] as const, // 산책 완료 - Walk 연동 전
  },
  mission: {
    walkingDays: ['days'] as const, // 해당 연, 월의 산책한 day들, 추후에는 request도 추가해야 함. - Activity
    myActivity: (date: string) => ['activity', date] as const,
    getMission: ['w-mission'] as const, // 미션 조회 - Home V
  },
};
