import { useRouter } from 'next/router';

/*
현재 페이지의 url을 가져오는 커스텀 훅(Meta 컴포넌트 url 동적 주입시 사용)
ex) http://localhost:3000/dashboard/4/edit
router.asPath = /dashboard/4/edit
*/
const useCurrentUrl = (): string => {
  const router = useRouter();
  return router.asPath;
};

export default useCurrentUrl;
