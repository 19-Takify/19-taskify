import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement } from 'react';
import Meta from '@/components/Meta';

function Dashboard() {
  return (
    <>
      <Meta title="Taskify | 대시보드 이름 추가 예정" />
    </>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Dashboard;
