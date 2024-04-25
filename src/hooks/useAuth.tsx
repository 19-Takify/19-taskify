import { Provider, atom } from 'jotai';
import { authAtom, userAtom } from '@/store/auth';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/apis/axios';
import { useRouter } from 'next/router';
import { Auth, Login, User } from '@/types/auth';

export function useAuth(required: boolean) {
  const [auth, setAuth] = useAtom<Auth>(authAtom);
  const router = useRouter();

  const getMe = async () => {
    setAuth((prevValues: Auth) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser: User;
    try {
      const res = await axios.get('/users/me');
      nextUser = res.data;
    } finally {
      setAuth((prevValues: Auth) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  };

  const login = async (data: Login) => {
    await axios.post('auth/login', data);
    await getMe();
  };

  const logout = async () => {
    /** @TODO 로그아웃 구현하기 */
  };

  const updateMe = async (formData: FormData) => {
    const res = await axios.patch('users/me', formData);
    const nextUser = res.data;
    setAuth((prevValues: Auth) => ({
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
  }, []);

  return { auth, login, logout, updateMe };
}