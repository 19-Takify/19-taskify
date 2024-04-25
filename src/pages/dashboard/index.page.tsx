import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement } from 'react';

type DashBoard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};
function Dashboard() {
  return <div>Dashboard</div>;
}

Dashboard.getLayout = function getLayout(
  page: ReactElement,
  props: { dashboards: DashBoard[] },
) {
  return <DashBoardLayout {...props}>{page}</DashBoardLayout>;
};

export default Dashboard;
