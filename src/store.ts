import { atom, createStore, useAtom } from 'jotai';

//Jotai implementation
export const authAtom = atom({
  user: null,
  isPending: true,
  login: async ({ email, password }: any) => {},
  logout: () => {},
  updateMe: async (formData: any) => {},
});

// export const userAtom = atom(null);
// export const isPendingAtom = atom(true);
// export const loginAtom = atom(async ({ email, password }: any) => {});
// export const logoutAtom = atom(() => {});
// export const updateMeAtom = atom(async (formData: any) => {});
