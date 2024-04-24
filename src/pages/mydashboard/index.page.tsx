import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import { ReactElement } from 'react';
import Meta from '@/components/Meta';
import Profile from './components/Profile';
import styles from './style/mydashboard.module.scss';
import PasswordChnage from './components/PasswordChnage';
import BackButton from '@/components/Button/BackButton';

function MyDashboard() {
  return (
    <>
      <Meta title="Taskify | 마이페이지" />
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

MyDashboard.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default MyDashboard;
