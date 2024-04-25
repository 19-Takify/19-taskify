import { useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { userAtom } from '@/store/auth';
import { User } from '@/types/auth';

function useUserForPage(initialUser: User) {
  useHydrateAtoms([[userAtom, initialUser]], { dangerouslyForceHydrate: true });
  return useAtomValue(userAtom);
}

export default useUserForPage;
