import { useAtom } from 'jotai';
import { userAtom } from '@/store/auth';

function useUser() {
  const [user, setUser] = useAtom(userAtom);
  return { user, setUser };
}

export default useUser;
