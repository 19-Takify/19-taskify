import { atom } from 'jotai';

export const initialUser = {
  id: 0,
  email: '',
  nickname: '',
  profileImageUrl: '',
  createdAt: '',
  updatedAt: '',
};
export const userAtom = atom(initialUser);
