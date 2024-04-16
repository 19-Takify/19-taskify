import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/reset.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <Component {...pageProps} />
    </>
  );
}
