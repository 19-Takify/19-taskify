import { atom } from 'jotai';

type DashBoard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

export const sideMenuAtom = atom(false);

export const dashboardsAtom = atom<DashBoard[]>([]);
