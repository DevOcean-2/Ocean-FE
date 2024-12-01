import AxiosConfig from '@/src/pages/Feed/api/AxiosConfig';
import { FeedCreateRequest, FeedPostsResponse } from '@/src/pages/Feed/types';

const apiClient = new AxiosConfig('https://balbalm.yubin.dev/feed/', {});

export const getFeedPosts = async (userId: string): Promise<FeedPostsResponse[]> => {
  const response = await apiClient.get('/posts', { params: { user_id: userId } });
  return response.data;
};

export const createFeedPost = async (feedContent: FeedCreateRequest) => {
  const response = await apiClient.post('/posts', feedContent);
  return response.data;
};

export const deleteFeedPost = async (feedId: number) => {
  const response = await apiClient.delete(`/posts/${feedId}`);
  return response.data;
};

export const toggleFeedLike = async (postId: number) => {
  // const { post_id, ...rest } = checkLikeContent;

  const response = await apiClient.post(`/posts/${postId}/likes`, {});
  return response.data;
};
