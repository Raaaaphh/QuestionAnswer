import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';

interface InternalAxiosRequestConfig<T = any> extends AxiosRequestConfig<T> {
  headers: AxiosHeaders;
}

const instance = axios.create({
  baseURL: 'http://localhost:3000', // To cahnge once the website is deployed
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as unknown as AxiosHeaders;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
