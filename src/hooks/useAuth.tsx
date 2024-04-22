import { Provider, atom } from 'jotai';
import { authAtom } from '@/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/apis/axios';
import { useRouter } from 'next/router';

// export function AuthProvider({ children }: { children: any }) {

//   return <Provider>{children}</Provider>;
// }

export function useAuth(required: any) {
  const [auth, setAuth] = useAtom(authAtom);
  const router = useRouter();

  useEffect(() => {
    if (required && !auth.user && !auth.isPending) {
      router.push('/login');
    }
  }, [auth.user, auth.isPending, router, required]);

  async function getMe() {
    setAuth((prevValues: any) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser: any;
    try {
      const res = await axios.get('/users/me');
      nextUser = res.data;
    } finally {
      setAuth((prevValues: any) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({ email, password }: any) {
    await axios.post('auth/login', {
      email,
      password,
    });
    await getMe();
  }

  async function logout() {
    /** @TODO 로그아웃 구현하기 */
  }

  async function updateMe(formData: any) {
    const res = await axios.patch('users/me', formData);
    const nextUser = res.data;
    setAuth((prevValues: any) => ({
      ...prevValues,
      user: nextUser,
    }));
  }

  useEffect(() => {
    setAuth((prevValues: any) => ({
      ...prevValues,
      login,
      logout,
      updateMe,
    }));
    getMe();
  }, []);

  return [auth, setAuth];
}
