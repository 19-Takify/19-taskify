import SideMenu from '@/components/SideMenu';
import Head from 'next/head';

export default function Home() {
  const dashboards = [
    {
      id: 1,
      title: '홍길동',
      color: '#7853ca',
      createdByMe: true,
    },
    {
      id: 2,
      title: '홍길순',
      color: '#ec83c4',
      createdByMe: true,
    },
    {
      id: 3,
      title: '홍길창',
      color: '#3873ca',
      createdByMe: true,
    },
  ];

  return (
    <div>
      <SideMenu dashboards={dashboards} isOpen={true} />
      <Head>Taskify</Head>
      <h1>taskify</h1>
    </div>
  );
}
