import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import { ReactElement } from 'react';
import Meta from '@/components/Meta';
import Profile from './components/Profile';
import styles from './style/mypage.module.scss';
import PasswordChnage from './components/PasswordChange';
import BackButton from '@/components/Button/BackButton';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import Loading from '@/components/Loading';
import { useRouterLoading } from '@/hooks/useRouterLoading';

function MyPage() {
  const url = useCurrentUrl();
  const isLoading = useRouterLoading();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Meta title="Taskify | 마이페이지" url={url} />
      <div className={styles.wrap}>
        <div className={styles.box}>
          <div>
            <BackButton />
          </div>
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
