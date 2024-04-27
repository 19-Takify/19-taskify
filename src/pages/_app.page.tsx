import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/reset.scss';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/store/auth';
import App from 'next/app';
import { UserType } from '@/types/auth';
import axios from 'axios';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  user: UserType;
};

export default function MyApp({
  Component,
  pageProps,
  user,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const setUser = useSetAtom(userAtom);

  if (user?.email) {
    setUser(user);
  }

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

type AppOwnProps = { user: any };

MyApp.getInitialProps = async (
  context: AppContext,
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  const cookie = context.ctx.req?.headers.cookie?.match(
    new RegExp(
      '(?:^|; )' +
        'accessToken'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );

  const accessToken = cookie ? decodeURIComponent(cookie[1]) : undefined;

  let user;
  if (accessToken) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      user = res.data;
    } catch (error) {
      console.log(error);

      user = null;
    }
  }

  return { ...ctx, user };
};
