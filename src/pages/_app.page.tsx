import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/reset.scss';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { useSetAtom } from 'jotai';
import { initialUser, userAtom } from '@/store/auth';
import { UserType } from '@/types/auth';
import { getMeForServer } from '@/utils/auth';
import { AUTH_TOKEN_COOKIE_NAME } from '@/constants/auth';
import { getCookieWithCookies } from '@/utils/cookie';
import Head from 'next/head';
import { useRouterLoading } from '@/hooks/useRouterLoading';
import Loading from '@/components/Loading';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps &
  AppOwnProps & {
    Component: NextPageWithLayout;
  };

export default function MyApp({
  Component,
  pageProps,
  user,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const setUser = useSetAtom(userAtom);
  const isLoading = useRouterLoading();

  if (user?.email) {
    setUser(user);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Taskify</title>
      </Head>
      <ToastContainer pauseOnFocusLoss={false} />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

type AppOwnProps = { user: UserType };

MyApp.getInitialProps = async (
  context: AppContext,
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  const cookies = context.ctx.req?.headers.cookie;

  const accessToken = cookies
    ? getCookieWithCookies(AUTH_TOKEN_COOKIE_NAME, cookies)
    : null;

  const user = accessToken ? await getMeForServer(accessToken) : initialUser;

  return { ...ctx, user };
};
