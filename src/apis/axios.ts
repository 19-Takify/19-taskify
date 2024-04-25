import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import axios from 'axios';
import { getCookie } from '@/utils/cookie';
import { isDocument } from '@/utils/isDocument';
import { AUTH_TOKEN_COOKIE_NAME } from '@/constants/auth';
import { SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';
import setToast from '@/utils/setToast';
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

// getServerSideProps의 인자인 context를 변수에 할당하였습니다.
// context 변수를 통해서 interceptor에서 SSR일 때 cookie에 접근할 수 있도록 했습니다.
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
          // SSR 환경에서 인가에 실패했을 경우 next/router의 Router를 사용할 수 없어서 302 코드와 함께 login 페이지로 이동.
          context?.res.writeHead(302, { Location: '/login' });
          context?.res.end();
        } else {
          // CSR 환경에서 인가에 실패했을 경우 login 페이지 이동과 토스트 에러 실행.
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
