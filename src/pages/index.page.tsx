import MainLayout from '@/components/Layout/MainLayout';
import { ReactElement } from 'react';

export default function Home() {
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

// getLayout 사용법
Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
