import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/reset.scss';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="Taskify" />
        <meta name="keyword" content="Taskify, 일정관리, 간편함" />
        <meta name="description" content="간편한 일정관리 서비스 Taskify" />

        {/* Open Graph */}
        <meta property="og:title" content="Taskify" />
        <meta
          property="og:description"
          content="간편한 일정관리 서비스 Taskify"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://team19-main.vercel.app/" />
        <meta property="og:image" content="카카오 OG 이미지 추가 예정" />
        <meta property="og:image:alt" content="Taskify 로고 이미지" />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter */}
        <meta property="twitter:title" content="Taskify" />
        <meta
          name="twitter:description"
          content="간편한 일정관리 서비스 Taskify"
        />
        <meta name="twitter:card" content="website" />
        <meta
          property="twitter:site"
          content="https://team19-main.vercel.app/"
        />
        <meta name="twitter:image" content="트위터 OG 이미지 추가 예정" />
        <meta property="twitter:image:alt" content="Taskify 로고 이미지" />
      </Head>
      <ToastContainer pauseOnFocusLoss={false} />
      <Component {...pageProps} />
    </>
  );
}
