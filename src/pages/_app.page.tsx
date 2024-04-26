import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/reset.scss';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { useSetAtom } from 'jotai';
import { initialUser, userAtom } from '@/store/auth';
import App from 'next/app';
import { UserType } from '@/types/auth';

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
  setUser(initialUser);
  // if (pageProps?.user) {
  //   setUser(pageProps.user);
  // }

  if (user) {
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
  console.log('initialProps');

  const ctx = await App.getInitialProps(context);
  // const user = context.ctx;
  const headers = context.ctx.req?.headers;
  const encodedUser = headers?.['x-user'] as string;

  const user = encodedUser
    ? JSON.parse(decodeURIComponent(encodedUser))
    : initialUser;

  return { ...ctx, user };
};
