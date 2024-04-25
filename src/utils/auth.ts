import axios from '@/apis/axios';
import { deleteCookie } from './cookie';
import { AUTH_TOKEN_COOKIE_NAME } from '@/constants/auth';

export const getMe = async () => {
  const res = await axios.get('/users/me');
  return res?.data || null;
};

export const getMeForMiddleware = async (accessToken?: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}users/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error();
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  deleteCookie(AUTH_TOKEN_COOKIE_NAME);
};
