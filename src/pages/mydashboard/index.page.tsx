import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import { ReactElement } from 'react';
import Meta from '@/components/Meta';

function MyDashboard() {
  return (
    <>
      <Meta title="Taskify | 마이페이지" />
    </>
  );
}

MyDashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default MyDashboard;
