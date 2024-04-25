import axios from '@/apis/axios';
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

// middleware에서는 axios를 사용할 수 없어서 middleware에서 인가처리를 위한 함수를 따로 만들었습니다.
// 로그인 여부만 체크하면 되기 때문에 boolean 값을 return 합니다.
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
