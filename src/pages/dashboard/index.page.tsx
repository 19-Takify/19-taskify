import DashBoardLayout from '@/components/Layout/DashBoardLayout2';
import React, { ReactElement } from 'react';

function Dashboard() {
  return <div>Dashboard</div>;
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Dashboard;
