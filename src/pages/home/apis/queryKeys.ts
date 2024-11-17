export const queryKeys = {
  walk: {
    myInfo: ['info'] as const, // 강아지 정보 - Home
    ranking: ['ranking'] as const, // 산책 랭킹 - Home
    currentWeather: ['weather'] as const, // 현재 날씨 - Home
    currentTown: ['town'] as const, // 현재 구 - Home
    recommendPlace: ['place'] as const, // 추천 장소 - Home

    /** 멍멍이 피드 추천 추가 필요 */
    /** 미션 리스트 조회 추가 필요 */
    /** 산책 시작 sse 알림 */
    /** 사진 업로드 */

    completeWalk: ['complete'] as const,
  },
  mission: {
    walkingDays: ['days'] as const, // 해당 연, 월의 산책한 day들, 추후에는 request도 추가해야 함. - Activity
    myActivity: (date: string) => ['activity', date] as const,
  },
};
