import DashBoardHeader from '@/components/Header/DashBoard';
import SideMenu from '@/components/SideMenu';
import { PropsWithChildren } from 'react';
import { dashboardsAtom } from '@/utils/jotai';
import { useAtomValue } from 'jotai';

function DashBoardLayout({ children }: PropsWithChildren) {
  const dashboards = useAtomValue(dashboardsAtom);

  return (
    <>
      <DashBoardHeader />
      <SideMenu dashboards={dashboards} />
      <main>{children}</main>
    </>
  );
}

export default DashBoardLayout;
