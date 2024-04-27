import DashBoardHeader from '@/components/Header/DashBoard';
import SideMenu from '@/components/SideMenu';
import { PropsWithChildren } from 'react';
import { atom } from 'jotai/experimental';

export const sideMenuAtom = atom(false);

function DashBoardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DashBoardHeader />
      <SideMenu />
      <>{children}</>
    </>
  );
}

export default DashBoardLayout;
