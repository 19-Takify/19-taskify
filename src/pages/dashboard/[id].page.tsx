import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Dashboard() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Taskify | 대시보드 이름 추가 예정</title>
      </Head>
      {id}
    </>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Dashboard;
