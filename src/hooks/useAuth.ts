import { authAtom } from '@/store/auth';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import axios from '@/apis/axios';
import { useRouter } from 'next/router';
import { AuthType, LoginType, UserType } from '@/types/auth';

export function useAuth(required: boolean) {
  const [auth, setAuth] = useAtom<AuthType>(authAtom);
  const router = useRouter();

  const getMe = useCallback(async () => {
    setAuth((prevValues: AuthType) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser: UserType;
    try {
      const res = await axios.get('/users/me');
      nextUser = res.data;
    } finally {
      setAuth((prevValues: AuthType) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }, [setAuth]);

  const login = async (data: LoginType) => {
    await axios.post('auth/login', data);
    await getMe();
  };

  const logout = async () => {
    /** @TODO 로그아웃 구현하기 */
  };

  const updateMe = async (formData: FormData) => {
    const res = await axios.patch('users/me', formData);
    const nextUser = res.data;
    setAuth((prevValues: AuthType) => ({
      ...prevValues,
      user: nextUser,
    }));
  };

  useEffect(() => {
    if (required && !auth.user && !auth.isPending) {
      router.push('/login');
    }
  }, [auth.user, auth.isPending, router, required]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  return { auth, login, logout, updateMe };
}
