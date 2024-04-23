import { atom, createStore, useAtom } from 'jotai';

//Jotai implementation
export const authAtom = atom({
  user: null,
  isPending: true,
  login: async ({ email, password }: any) => {},
  logout: () => {},
  updateMe: async (formData: any) => {},
});
