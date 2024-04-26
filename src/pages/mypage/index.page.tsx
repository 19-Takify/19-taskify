import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import { ReactElement } from 'react';
import Meta from '@/components/Meta';
import Profile from './components/Profile';
import styles from './style/mypage.module.scss';
import PasswordChnage from './components/PasswordChnage';
import BackButton from '@/components/Button/BackButton';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { GetServerSidePropsContext } from 'next';
import { setContext } from '@/apis/axios';
import { getMe } from '@/utils/auth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  setContext(context);

  const user = await getMe();

  return {
    props: { user, data: 'example' },
  };
}

function MyPage() {
  return (
    <>
      <Meta title="Taskify | 마이페이지" url={useCurrentUrl()} />
      <div className={styles.wrap}>
        <div className={styles.box}>
          <BackButton />
          <Profile />
          <PasswordChnage />
        </div>
      </div>
    </>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default MyPage;
