import DashboardLayout from '@/components/Layout/DashboardLayout';
import React, { ReactElement } from 'react';

function Dashboard() {
  return <div>Dashboard</div>;
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
