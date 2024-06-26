import Head from 'next/head';
import kakaoOg from '@/images/og-kakao.png';
import twitterOg from '@/images/og-twitter.png';

type HeadProps = {
  title?: string;
  url?: string;
};

/*
사용 방법
props
title 원하는 제목 추가
url 동적 url 주입
import useCurrentUrl from '@/hooks/useCurrentUrl'
<Meta title="Taskify | 마이페이지" url={useCurrentUrl()} />
 */

function Meta({ title, url = '' }: HeadProps) {
  return (
    <Head>
      <title>{title ?? 'Taskify'}</title>
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
      <meta
        property="og:url"
        content={`https://team19-main.vercel.app${url}`}
      />
      <meta property="og:image" content={kakaoOg.src} />
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
        content={`https://team19-main.vercel.app${url}`}
      />
      <meta name="twitter:image" content={twitterOg.src} />
      <meta property="twitter:image:alt" content="Taskify 로고 이미지" />
    </Head>
  );
}

export default Meta;
