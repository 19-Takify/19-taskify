import { Auth, User } from '@/types/auth';
import { atom } from 'jotai';

export const initialUser = {
  id: 0,
  email: '',
  nickname: '',
  profileImageUrl: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const userAtom = atom<User>(initialUser);

export const authAtom = atom<Auth>({
  user: initialUser,
  isPending: false,
});
