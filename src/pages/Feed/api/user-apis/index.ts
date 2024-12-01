import AxiosConfig from '@/src/pages/Feed/api/AxiosConfig';
import axios from 'axios';
import { UserInfoResponse, UserVisitorsResponse } from '@/src/pages/Feed/types';

const apiClient = new AxiosConfig('https://balbalm.yubin.dev/user/', {});

export const getUserApiList = async () => {
  return axios.get('https://balbalm.yubin.dev/user');
};

export const getUserInfo = async (userId: string): Promise<UserInfoResponse> => {
  const response = await apiClient.get(`/profiles/${userId}`);
  return response.data;
};

export const getUserVisitors = async (userId: string): Promise<UserVisitorsResponse[]> => {
  const response = await apiClient.get(`/profiles/visitors/${userId}`);
  return response.data;
};
