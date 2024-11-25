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
      missionType: 'TREASURE_HUNT' | 'LANDMARK' | 'FEED';
      count: number;
      percent: string;
      missionProgressType: string;
      completeDate: string;
      complete: boolean;
    }[];
  };
}

export interface CheckMissionResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    missionList: {
      message: string;
      percent: string;
      missionProgressType: string;
      distance: number;
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

export interface FeedMissionResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    mission: string;
    hashtag: string[];
    month: number;
    year: number;
    missionId: number;
    isDone: boolean;
  };
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

  // 피드 미션 조회
  getFeedMission: async (year: number, month: number) => {
    const response = await apiClient.get<FeedMissionResponse>('mission/api/feed-mission', {
      params: {
        year,
        month,
      },
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
      },
    });

    const feedMissionData = response.data;

    return [
      {
        missionId: feedMissionData.result.missionId,
        userMissionId: '',
        missionName: feedMissionData.result.mission,
        missionType: 'FEED',
        count: 0,
        percent: feedMissionData.result?.isDone ? '100' : '0',
        missionProgressType: feedMissionData.result?.isDone ? 'COMPLETE' : 'READY',
        completeDate: '',
        complete: Boolean(feedMissionData.result?.isDone),
      },
    ];
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

  checkLandMarkMission: async (params: { latitude: number; longitude: number }) => {
    console.log('[API Request] checkLandMarkMission');

    const { latitude, longitude } = params;
    const response = await apiClient.post<CheckMissionResponse>(
      'mission/api/landmark',
      {
        missionType: 'LANDMARK',
        latitude,
        longitude,
      },
      {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
        },
      },
    );

    console.log(response.data.result.missionList);

    return response.data.result.missionList;
  },

  checkTreasureHuntMission: async (params: { latitude: number; longitude: number }) => {
    console.log('[API Request] checkTreasureHuntMission');

    const { latitude, longitude } = params;
    const response = await apiClient.post<CheckMissionResponse>(
      'mission/api/treasure-hunt',
      {
        missionType: 'TREASURE_HUNT',
        latitude,
        longitude,
      },
      {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
        },
      },
    );

    console.log(response.data.result.missionList);

    return response.data.result.missionList;
  },
};
