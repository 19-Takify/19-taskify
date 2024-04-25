import axios from '@/apis/axios';
import { FieldValues } from 'react-hook-form';
import { deleteCookie, setCookie } from './cookie';
import { AUTH_TOKEN_COOKIE_NAME } from '@/constants/auth';
import { Login } from '@/types/auth';

export const getMe = async () => {
  try {
    const res = await axios.get('/users/me');
    return res.data;
  } catch {
    return null;
  }
};

export const getMeForMiddleware = async (accessToken?: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
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
  } catch {
    return false;
  }
};

/**
 * @TODO 로그인 상태 유지 시 24시간 유지
 */
export const login = async (data: Login) => {
  const response = await axios.post('/auth/login', data);
  const { accessToken } = response.data;
  const maxAge = 43200;

  setCookie(AUTH_TOKEN_COOKIE_NAME, accessToken, {
    'max-age': maxAge,
  });
};

export const logout = () => {
  deleteCookie(AUTH_TOKEN_COOKIE_NAME);
};
