import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/reset.scss';
import { Provider } from 'jotai';
import { myStore } from '@/stores/auth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={myStore}>
        <ToastContainer pauseOnFocusLoss={false} />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
