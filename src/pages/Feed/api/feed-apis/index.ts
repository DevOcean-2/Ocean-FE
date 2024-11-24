import AxiosConfig from '@/src/pages/Feed/api/AxiosConfig';
import axios from 'axios';
import { FeedCreateRequest, FeedPostsResponse, UserInfoResponse } from '@/src/pages/Feed/types';

const feedApiClient = new AxiosConfig('https://balbalm.yubin.dev/feed/', {});
const userApiClient = new AxiosConfig('https://balbalm.yubin.dev/user/', {});

export const getApiList = async () => {
  // return await axios.get('https://balbalm.yubin.dev/feed');
  return await axios.get('https://balbalm.yubin.dev/feed/posts?user_id=yonhoon_test', {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08`,
    },
  });
  // return await axios.get('https://dummyapi.online/api/movies');
};

export const getFeedPosts = async (userId: string): Promise<FeedPostsResponse[]> => {
  const response = await feedApiClient.get('/posts', { params: { user_id: userId } });
  return response.data;
};

export const createFeedPost = async (feedContent: FeedCreateRequest) => {
  const response = await feedApiClient.post('/posts', feedContent);
  return response.data;
};

export const deleteFeedPost = async (feedId: number) => {
  const response = await feedApiClient.delete(`/posts/${feedId}`);
  return response.data;
};

export const toggleFeedLike = async (postId: number) => {
  // const { post_id, ...rest } = checkLikeContent;

  const response = await feedApiClient.post(`/posts/${postId}/likes`, {});
  return response.data;
};

export const getUserApiList = async () => {
  return axios.get('https://balbalm.yubin.dev/user');
};

export const getUserInfo = async (userId: string): Promise<UserInfoResponse> => {
  const response = await userApiClient.get(`/profiles/${userId}`);
  return response.data;
};
