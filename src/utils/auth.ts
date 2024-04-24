import axios from '@/apis/axios';
import { deleteCookie } from './cookie';
import { AUTH_TOKEN_COOKIE_NAME } from '@/constants/auth';

export const getMe = async () => {
  const res = await axios.get('/users/me');
  return res.data;
};

export const logout = () => {
  deleteCookie(AUTH_TOKEN_COOKIE_NAME);
};
