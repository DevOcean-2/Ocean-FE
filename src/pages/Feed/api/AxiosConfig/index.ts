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
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNzMyNTI0MDY4LCJuYmYiOjE3MzI1MjQwNjgsImp0aSI6ImU1NGJlMzg4LTE2YzAtNDk2Yi1hYTFhLTU4N2E3Y2MwMmRkNSIsImV4cCI6MTczMzEyODg2OCwidHlwZSI6ImFjY2VzcyIsImZyZXNoIjpmYWxzZSwic29jaWFsX2lkIjoiMzc0ODk3Mzc1NCJ9.Owc93hjCzV_opWLmnaHcN-KvofiIK0oizF3WABuOzkU';
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
