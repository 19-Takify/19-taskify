import { User, ssrUser } from '@/stores/auth';
import { useAtomValue } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

function useUserForPage(initialUser: User) {
  useHydrateAtoms([[ssrUser, initialUser]], { dangerouslyForceHydrate: true });
  return useAtomValue(ssrUser);
}

export default useUserForPage;
