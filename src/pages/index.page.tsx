import Button from '@/components/Button';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Button usage="signin" />
      <Button usage="signup" disabled />
      <Button usage="card" />
      <Button usage="column" />
      <Button usage="confirm" />
      <Button usage="deny" />
      <Button usage="delete" />
      <Button usage="dashboard" />
      <Button usage="dashboardAdd" />
      <Button usage="dashboardRemove" />
      <Head>Taskify</Head>
      <h1>taskify</h1>
    </>
  );
}
