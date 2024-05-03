import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import { ReactElement } from 'react';
import Meta from '@/components/Meta';
import Profile from './components/Profile';
import styles from './style/mypage.module.scss';
import PasswordChange from './components/PasswordChange';
import BackButton from '@/components/Button/BackButton';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import { RefObject } from 'react';
import useSlideAnimation from '@/hooks/useSlideAnimation';

function MyPage() {
  const [refElement, isOpen, renderDelayed] = useSlideAnimation(styles.close);

  return (
    <>
      <Meta title="Taskify | 마이페이지" url={useCurrentUrl()} />
      <div
        ref={refElement as RefObject<HTMLDivElement>}
        className={`${styles.wrap} ${isOpen && styles.open}`}
      >
        {renderDelayed && (
          <div className={styles.box}>
            <div>
              <BackButton />
            </div>
            <Profile />
            <PasswordChange />
          </div>
        )}
      </div>
    </>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default MyPage;
