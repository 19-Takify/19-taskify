import { atom, createStore } from 'jotai';

export const myStore = createStore();
export const authAtom = atom(0);

myStore.set(authAtom, 0);

export type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export const initialUser = {
  id: 0,
  email: '',
  nickname: '',
  profileImageUrl: null,
  createdAt: '',
  updatedAt: '',
};
export const ssrUser = atom<User>(initialUser);
