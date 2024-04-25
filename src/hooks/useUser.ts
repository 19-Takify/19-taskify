import { useAtom } from 'jotai';
import { userAtom } from '@/store/auth';

// useAtom(userAtom)을 추상화하여 쉽게 사용할 수 있는 커스텀 훅.
function useUser() {
  const [user, setUser] = useAtom(userAtom);
  return { user, setUser };
}

export default useUser;
