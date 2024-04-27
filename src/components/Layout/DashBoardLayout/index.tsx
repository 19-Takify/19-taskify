import DashBoardHeader from '@/components/Header/DashBoard';
import SideMenu from '@/components/SideMenu';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import { PropsWithChildren, useEffect, useState } from 'react';
import { atom } from 'jotai/experimental';

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

function DashBoardLayout({ children }: PropsWithChildren) {
  const [dashboards, setDashboards] = useState<DashBoard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const httpClient = new HttpClient(instance);
      const dashboardsData = await httpClient.get<{ dashboards: DashBoard[] }>(
        '/dashboards?navigationMethod=infiniteScroll',
      );
      setDashboards(dashboardsData.dashboards);
    };

    fetchData();
  }, []);

  return (
    <>
      <DashBoardHeader />
      <SideMenu />
      <>{children}</>
    </>
  );
}

export default DashBoardLayout;
