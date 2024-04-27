import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement } from 'react';
import Meta from '@/components/Meta';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { GetServerSidePropsContext } from 'next';
import { setContext } from '@/apis/axios';
import { getMe } from '@/utils/auth';
import { useAtomValue } from 'jotai';
import { selectDashboardAtom } from '@/store/dashboard';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  setContext(context);

  const user = await getMe();

  return {
    props: { user },
  };
}

function Dashboard() {
  const selectDashboard = useAtomValue(selectDashboardAtom);
  return (
    <>
      <Meta
        title={`Taskify | ${selectDashboard.title}`}
        url={useCurrentUrl()}
      />
    </>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Dashboard;
