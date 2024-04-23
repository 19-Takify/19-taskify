import axios from 'axios';
import { getCookie } from './cookie';
import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
const instance = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-19/',
});

// getServerSideProps에서 쿠키를 가져오기 위해서 변수를 만들어서 context를 주입.
let context: GetServerSidePropsContext | null = null;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

// 요청 인터셉터
instance.interceptors.request.use(
  async function (config) {
    // SSR을 감지해서 SSR일 경우 context에서 쿠키 가져오기.
    const isServer = typeof window === 'undefined';
    console.log('isServer: ', isServer);

    const accessToken = isServer
      ? context?.req?.cookies?.accessToken
      : getCookie('accessToken');

    // 토큰이 있으면 요청 헤더에 추가한다.
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // 요청 오류 처리
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status;
    if (statusCode === 401) {
      // return Promise.reject('로그인을 다시시도해 주세요.');
      Router.push('/login');
    }
    return Promise.reject(error);
  },
);

export default instance;
