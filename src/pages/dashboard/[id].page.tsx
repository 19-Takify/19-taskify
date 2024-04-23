import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

function Dashboard() {
  const router = useRouter();
  const { id } = router.query;

  return <>{id}</>;
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Dashboard;
