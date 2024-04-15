import Button from '@/components/Button/Button';
import ButtonDashboard from '@/components/Button/ButtonDashboard';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Button usage="signin" />
      <Head>Taskify</Head>
      <h1>taskify</h1>
    </>
  );
}
