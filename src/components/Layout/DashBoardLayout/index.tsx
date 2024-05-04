import DashBoardHeader from '@/components/Header/DashBoard';
import SideMenu from '@/components/SideMenu';
import { PropsWithChildren } from 'react';
import { atom } from 'jotai/experimental';
import styles from './DashBoardLayout.module.scss';
import { useRouter } from 'next/router';

export const sideMenuAtom = atom(false);

function DashBoardLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const isFixed = router.query.id && !router.asPath.includes('edit');
  return (
    <>
      <DashBoardHeader />
      {isFixed ? (
        <>
          <SideMenu />
          {children}
        </>
      ) : (
        <div className={styles.layoutWrap}>
          <SideMenu />
          {children}
        </div>
      )}
    </>
  );
}

export default DashBoardLayout;
