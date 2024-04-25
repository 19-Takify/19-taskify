import { useRouter } from 'next/router';

const useCurrentUrl = (): string => {
  const router = useRouter();
  return router.asPath;
};

export default useCurrentUrl;
