import axios from 'axios';
import { getCookie } from '@/utils/cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//쿠키가 있으면 헤더에 추가
instance.interceptors.request.use(
  (config) => {
    const cookie = getCookie('accessToken');

    if (cookie) {
      config.headers.Authorization = `Bearer ${cookie}`;
      return config;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
