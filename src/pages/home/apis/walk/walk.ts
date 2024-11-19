import { apiClient } from '../apiClient';

export interface RankingResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    rankList: {
      userId: string;
      totalDistance: number;
      profileImageUrl: string;
      nickName: string;
    }[];
  };
}

export const walkApi = {
  getWalkRanking: async () => {
    const response = await apiClient.get<RankingResponse>('walk/api/walk/rank');
    return response.data.result.rankList;
  },
};
