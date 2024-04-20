import { atom, createStore } from 'jotai';

export const myStore = createStore();
export const authAtom = atom(0);

myStore.set(authAtom, 0);
