import AxiosConfig from '@/src/pages/Feed/api/AxiosConfig';
import axios from 'axios';
import { FeedCreateRequest, FeedPostsResponse } from '@/src/pages/Feed/types';

const apiClient = new AxiosConfig('https://balbalm.yubin.dev/feed/', {});

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
  const response = await apiClient.get('/posts', { params: { user_id: userId } });
  return response.data;
};

export const createFeedPost = async (feedContent: FeedCreateRequest) => {
  const response = await apiClient.post('/posts', feedContent);
  return response.data;
};
