import { useAtomValue } from 'jotai';
import { userAtom } from '@/store/auth';

function useUser() {
  return useAtomValue(userAtom);
}

export default useUser;
