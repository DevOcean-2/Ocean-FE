import axios from 'axios';

class AxiosConfig {
  client;

  constructor(baseURL = '', defaultHeaders = {}) {
    this.client = axios.create({
      baseURL,

    });

    this.client.interceptors.request.use(
      (config) => {
        // const token = localStorage.getItem('jwtToken');
        const token =
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b25naG9vbl90ZXN0Iiwic29jaWFsX2lkIjoieW9uZ2hvb25fdGVzdCIsImV4cCI6MTc0MDM3NTI4NywidHlwZSI6ImFjY2VzcyJ9.Jt5XIcq_3Gzaq8_qJcVTyqj1jrkVXW0b60fYI52gT08';
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn('Unauthorized! Redirecting to login...');
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      },
    );
  }

  get(url: string, config = {}) {
    return this.client.get(url, config);
  }

  post<T>(url: string, data: T, config = {}) {
    return this.client.post(url, data, config);
  }

  put<T>(url: string, data: T, config = {}) {
    return this.client.put(url, data, config);
  }

  delete(url: string, config = {}) {
    return this.client.delete(url, config);
  }
}

export default AxiosConfig;
