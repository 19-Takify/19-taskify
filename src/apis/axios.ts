import axios from 'axios';
import { getCookie } from '@/utils/cookie';

const cookie = getCookie('accessToken');

const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-19/',
  headers: {
    Authorization: cookie ? `Bearer ${cookie}` : undefined,
  },
});

export default instance;
