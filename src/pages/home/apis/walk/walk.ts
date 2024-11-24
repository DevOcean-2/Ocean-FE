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

export interface RecommendPlaceResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    list: {
      name: string;
      category: string;
      pictures: string[];
      distance: number;
      address: string;
    }[];
  };
}

export interface MyInfoResponse {
  user_name: string;
  dog_name: string;
  dog_gender: string;
  dog_size: string;
  dog_cuteness: number;
  dog_breed: string;
  photo_path: string;
  birth_day: string; // YYYYMMDD
  current_weight: number;
  past_weight: number;
  weight_change: number;
  age: string; // Y년 M개월
}

export interface RecommendFeedResponse {
  post_id: number;
  user_id: string;
  user_name: string;
  image_urls: string[];
  liked_by: {
    user_id: string;
    nickname: string;
    profile_image_url: string;
  }[];
}

export interface NotificationResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    missionList: {
      missionProgressType: 'READY' | 'PROGRESS' | 'COMPLETE';
      percent: number;
      message: string;
      distance: number;
      complete: boolean;
    }[];
  };
}

export interface WalkResponse {
  id: string;
  event: 'LANDMARK' | 'TREASURE_HUNT';
  data: {
    type: 'LANDMARK' | 'TREASURE_HUNT';
    message: {
      userId: string;
      userMissionInfoList: any[];
    };
  } | null;
}

export const walkApi = {
  // 산책 랭킹
  getWalkRanking: async () => {
    console.log('[API Request] getWalkRanking');
    const response = await apiClient.get<RankingResponse>('walk/api/walk/rank');
    console.log('[API Response] getWalkRanking:', response.data.result.rankList);

    return response.data.result.rankList;
  },

  // 유저 정보
  getMyInformation: async (userId: number) => {
    console.log('[API Request] getMyInformation', { userId });
    const response = await apiClient.get<MyInfoResponse>(`user/profiles/${userId}`);
    console.log('[API Response] getMyInformation:', response.data);

    const homeInformation = {
      dogName: response.data.dog_name,
      dogBreed: response.data.dog_breed,
      profileImage:
        response.data.photo_path.length > 0
          ? response.data.photo_path
          : 'https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      walkDistance: 3,
      highestRank: 11,
    };

    return homeInformation;
  },

  // 추천 장소
  getRecommendPlace: async () => {
    console.log('[API Request] getRecommendPlace');
    const response = await apiClient.get<RecommendPlaceResponse>('walk/api/dummy/place-recommend');
    console.log('[API Response] getRecommendPlace:', response.data.result.list);
    return response.data.result.list;
  },

  // 피드 추천
  getRecommendFeed: async () => {
    console.log('[API Request] getRecommendFeed');
    const response = await apiClient.get<RecommendFeedResponse[]>('feed/posts/famous', {
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
      },
    });
    console.log('[API Response] getRecommendFeed:', response.data);

    const feedList = response.data.map((feed) => ({
      postId: feed.post_id,
      userId: feed.user_id,
      userName: feed.user_name,
      profileImage:
        feed.image_urls?.[0].length > 30
          ? feed.image_urls[0]
          : 'https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      liked: feed.liked_by.length,
    }));

    return feedList;
  },

  // 미션 등록
  startMission: async (params: { missionType: 'TREASURE_HUNT' | 'FEED' | 'LANDMARK' }) => {
    const { missionType } = params;
    console.log('[API Request] startMission', { missionType });

    const response = await apiClient.get<WalkResponse>('mission/api/notification/subscribe', {
      params: {
        missionType,
      },
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
      },
    });

    console.log(response.data);

    const completedMission = response.data.data?.message;
  },

  getWalkNotification: async () => {
    console.log('[API Request] getWalkNotification');
    const response = await apiClient.get<NotificationResponse>('mission/api/notification/list', {
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
      },
    });

    return response.data.result.missionList;
  },

  completeWalkMission: async (params: { missionType: 'TREASURE_HUNT' | 'LANDMARK' }) => {
    const { missionType } = params;

    // 산책 종료
    await apiClient.delete('mission/api/notification/unsubscribe', {
      params: {
        missionType,
      },
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
      },
    });
  },

  // FEED 미션 완료
  completeFeedMission: async (params: { postId: number }) => {
    console.log('[API Request] completeMission', params);

    const { postId } = params;

    // mission 완료
    const completeResponse = await apiClient.post(
      'mission/api/feed-mission',
      {
        missionId: postId,
        hashTag: 'lol', // test 값
      },
      {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
        },
      },
    );

    console.log('[API Response] completeMission - mission complete:', completeResponse.data);

    // 산책 종료
    await apiClient.delete('mission/api/notification/unsubscribe', {
      params: {
        missionType: 'FEED',
      },
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08',
      },
    });

    return completeResponse.data.result;
  },
};
