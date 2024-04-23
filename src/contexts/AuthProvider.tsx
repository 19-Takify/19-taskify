import { Provider, atom } from 'jotai';
import { authAtom } from '@/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/apis/axios';

export function AuthProvider({ children }: { children: any }) {
  const valueAtom = atom({
    user: null,
    isPending: true,
  });
  const [values, setValues] = useAtom(valueAtom);
  const [auth, setAuth] = useAtom(authAtom);

  async function getMe() {
    setValues((prevValues: any) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser: any;
    try {
      const res = await axios.get('/users/me');
      nextUser = res.data;
    } finally {
      setValues((prevValues: any) => ({
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
    setValues((prevValues: any) => ({
      ...prevValues,
      user: nextUser,
    }));
  }

  useEffect(() => {
    getMe();
  }, []);

  setAuth({
    user: values.user,
    isPending: values.isPending,
    login,
    logout,
    updateMe,
  });

  return <Provider>{children}</Provider>;
}

export function useAuth(required: any) {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (required && !auth.user && !auth.isPending) {
      navigate('/login');
    }
  }, [auth.user, auth.isPending, navigate, required]);

  return [auth, setAuth];
}
