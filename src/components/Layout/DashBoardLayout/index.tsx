import DashBoardHeader from '@/components/Header/DashBoard';
import SideMenu from '@/components/SideMenu';
import { atom } from 'jotai';
import { PropsWithChildren } from 'react';

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
