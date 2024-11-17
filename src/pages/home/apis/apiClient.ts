import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://balbalm.yubin.dev/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // request interceptor logic
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // response interceptor logic
    return Promise.reject(error);
  },
);
