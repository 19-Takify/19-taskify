import { ssrUser } from '@/stores/auth';
import { useAtomValue } from 'jotai';

function useUser() {
  return useAtomValue(ssrUser);
}

export default useUser;
