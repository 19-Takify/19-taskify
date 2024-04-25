import DashBoardHeader from '@/components/Header/DashBoard';
import SideMenu from '@/components/SideMenu';
import { PropsWithChildren, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
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

function DashBoardLayout({
  children,
  dashboards,
}: PropsWithChildren<{ dashboards: DashBoard[] }>) {
  const [dashboard, setDashboard] = useAtom(dashboardsAtom);

  useEffect(() => {
    setDashboard(dashboards as any);
  }, [dashboards]);

  console.log(dashboards);

  return (
    <>
      <DashBoardHeader />
      <SideMenu dashboards={dashboard} />
      <main>{children}</main>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const accessToken = context.req.cookies.accessToken;
    const httpClient = new HttpClient(instance);
    const dashboardsData = (await httpClient.get(
      '/dashboards?navigationMethod=infiniteScroll',
      {
        Authorization: `Bearer ${accessToken}`,
      },
    )) as {
      dashboards: DashBoard[];
    };

    return {
      props: {
        dashboards: dashboardsData.dashboards,
      },
    };
  } catch (error) {
    return {
      props: {
        dashboards: [],
      },
    };
  }
};

export default DashBoardLayout;
