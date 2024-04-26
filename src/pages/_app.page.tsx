import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/reset.scss';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { useSetAtom } from 'jotai';
import { initialUser, userAtom } from '@/store/auth';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const setUser = useSetAtom(userAtom);
  setUser(initialUser);
  if (pageProps?.user) {
    setUser(pageProps.user);
  }

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
