import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { getCookie } from '@/utils/cookie';
import { isDocument } from '@/utils/isDocument';
import { AUTH_TOKEN_COOKIE_NAME } from '@/constants/auth';
const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/2-9/',
});

let context: GetServerSidePropsContext | null = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

instance.interceptors.request.use(async (config) => {
  const isServer = !isDocument();
  const accessToken = isServer
    ? context?.req?.cookies?.[AUTH_TOKEN_COOKIE_NAME]
    : getCookie(AUTH_TOKEN_COOKIE_NAME);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default instance;
