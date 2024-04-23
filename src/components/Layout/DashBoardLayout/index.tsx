import DashBoardHeader from '@/components/Header/DashBoard';
import SideMenu from '@/components/SideMenu';
import { atom } from 'jotai';
import { PropsWithChildren } from 'react';

export const sideMenuAtom = atom(false);

// 테스트 데이터
const dashboards = [
  { id: 1, title: '송은', color: '#7AC555' },
  { id: 2, title: '유빈', color: '#760DDE' },
  { id: 3, title: '승구', color: '#FFA500' },
  { id: 4, title: '우혁', color: '#76A5EA' },
  { id: 5, title: '봉찬', color: '#E876EA' },
];

function DashBoardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DashBoardHeader />
      <SideMenu dashboards={dashboards} />
      <>{children}</>
    </>
  );
}

export default DashBoardLayout;
