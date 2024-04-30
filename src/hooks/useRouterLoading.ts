import { useState, useEffect } from 'react';
import Router from 'next/router';

export const useRouterLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => {
      setIsLoading(true);
    };

    const endLoading = () => {
      setIsLoading(false);
    };

    Router.events.on('routeChangeStart', startLoading); // 경로가 변할 때 실행
    Router.events.on('routeChangeComplete', endLoading); // 경로가 완전히 변경되면 실행
    Router.events.on('routeChangeError', endLoading); // 경로 이동 시 에러가 발생되면 실행

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', endLoading);
      Router.events.off('routeChangeError', endLoading);
    };
  }, []);

  return isLoading;
};
