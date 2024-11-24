import { apiClient } from '../apiClient';

export interface MissionResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    missionList: {
      missionId: number;
      userMissionId: number;
      missionName: string;
      missionType: string;
      count: number;
      percent: string;
      missionProgressType: string;
      completeDate: string;
      complete: boolean;
    }[];
  };
}

export interface MyActivityResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    time: number;
    distance: number;
    kcal: number;
  }[];
}

export const missionApi = {
  // 미션 조회
  getMission: async () => {
    console.log('[API Request] getMission');
    const response = await apiClient.get<MissionResponse>('mission/api/list', {
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
      },
    });
    console.log('[API Response] getMission:', response.data.result.missionList);
    return response.data.result.missionList;
  },

  // 내 활동 조회
  getMyActivities: async (date: string /* YYYY-MM-DD */) => {
    console.log('[API Request] getMyActivities');
    console.log(date);
    // 2024-11-19 sample 데이터 존재.
    const response = await apiClient.get<MyActivityResponse>('walk/api/activity', {
      params: {
        date,
      },
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
      },
    });

    console.log(response.data.result);

    return response.data.result;
  },
};
