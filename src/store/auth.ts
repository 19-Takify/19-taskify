import { AuthType, UserType } from '@/types/auth';
import { atom } from 'jotai';

export const initialUser = {
  id: 0,
  email: '',
  nickname: '',
  profileImageUrl: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userAtom = atom<UserType>(initialUser);

export const authAtom = atom<AuthType>({
  user: initialUser,
  isPending: false,
});
