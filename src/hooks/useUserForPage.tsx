import { useHydrateAtoms } from 'jotai/utils';
import { userAtom } from '@/store/auth';
import { User } from '@/types/auth';

// SSR로 userAtom의 값을 넣어주기 위한 jotai의 utils입니다.
// 추상화를 거쳐서 사용의 편의를 높였습니다.
function useUserForPage(initialUser: User) {
  useHydrateAtoms([[userAtom, initialUser]]);
}

export default useUserForPage;
