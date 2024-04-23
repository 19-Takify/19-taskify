import DashBoard from '@/components/Header/DashBoard';
import SideMenu from '@/components/SideMenu';
import { atom } from 'jotai';
import { PropsWithChildren, useState } from 'react';

export const sideMenuAtom = atom(false);

// 테스트 데이터
const dashboards = [
  { title: '송은', color: '#7AC555' },
  { title: '유빈', color: '#760DDE' },
  { title: '승구', color: '#FFA500' },
  { title: '우혁', color: '#76A5EA' },
  { title: '봉찬', color: '#E876EA' },
];

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <DashBoard />
      <SideMenu dashboards={dashboards} />
      <main>{children}</main>
    </>
  );
}

export default DashboardLayout;
