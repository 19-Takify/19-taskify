import { atomWithStorage } from 'jotai/utils';

export const initialDashboard = {
  color: '',
  createdAt: '',
  createdByMe: false,
  id: 0,
  title: '',
  updatedAt: '',
  userId: 0,
};

type TDashboard = {
  color: string;
  createdAt: string;
  createdByMe: boolean;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
};

export const SELECT_DASHBOARD = 'SELECT_DASHBOARD';

export const selectDashboardAtom = atomWithStorage<TDashboard>(
  SELECT_DASHBOARD,
  initialDashboard,
);
