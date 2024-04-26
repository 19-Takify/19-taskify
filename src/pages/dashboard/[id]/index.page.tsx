import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement } from 'react';
import Meta from '@/components/Meta';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { GetServerSidePropsContext } from 'next';
import { setContext } from '@/apis/axios';
import { getMe } from '@/utils/auth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  setContext(context);

  const user = await getMe();

  return {
    props: { user, data: 'example' },
  };
}

function Dashboard() {
  return (
    <>
      <Meta title="Taskify | 대시보드 이름 추가 예정" url={useCurrentUrl()} />
    </>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Dashboard;
