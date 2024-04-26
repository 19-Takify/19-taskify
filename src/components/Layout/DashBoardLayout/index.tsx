import DashBoardHeader from '@/components/Header/DashBoard';
import SideMenu from '@/components/SideMenu';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import { PropsWithChildren, useEffect } from 'react';
import { dashboardsAtom } from '@/utils/jotai';
import { useAtom } from 'jotai';

type DashBoard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

function DashBoardLayout({ children }: PropsWithChildren) {
  const [dashboards, setDashboards] = useAtom(dashboardsAtom);

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
      <SideMenu dashboards={dashboards} />
      <>{children}</>
    </>
  );
}

export default DashBoardLayout;
