import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement } from 'react';
import Meta from '@/components/Meta';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { GetServerSidePropsContext } from 'next';
import { setContext } from '@/apis/axios';
import { getMe } from '@/utils/auth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // axios interceptor에서 cookie를 가져오기 위한 필수 함수 호출
  setContext(context);

  // user 전역 상태 초기값을 넣기 위한 user 객체
  const user = await getMe();

  return {
    props: { user, data: 'example' },
  };
}

function Dashboard() {
  return (
    <>
      <Meta title="Taskify | 대시보드 이름 추가 예정" url={useCurrentUrl()} />
    </>
  );
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Dashboard;
