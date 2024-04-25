import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import axios from 'axios';
import { getCookie } from '@/utils/cookie';
import { isDocument } from '@/utils/isDocument';
import { AUTH_TOKEN_COOKIE_NAME } from '@/constants/auth';
import { SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';
import setToast from '@/utils/setToast';
const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2-9/',
});

let context: GetServerSidePropsContext | null = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

instance.interceptors.request.use((config) => {
  const isServer = !isDocument();

  const accessToken = isServer
    ? context?.req?.cookies?.[AUTH_TOKEN_COOKIE_NAME]
    : getCookie(AUTH_TOKEN_COOKIE_NAME);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isServer = !isDocument();
    const statusCode = error.response?.status;
    switch (statusCode) {
      case 401:
        if (isServer) {
          context?.res.writeHead(302, { Location: '/login' });
          context?.res.end();
        } else {
          Router.push('/login');
          setToast('error', SERVER_ERROR_MESSAGE.USER.UNAUTHORIZED);
        }
        return;

      default:
        return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default instance;
