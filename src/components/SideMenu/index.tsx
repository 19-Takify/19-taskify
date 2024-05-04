import Circle from '@/components/Circle';
import { useSetAtom } from 'jotai';
import styles from './SideMenu.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState, RefObject } from 'react';
import { sideMenuAtom } from '../Layout/DashBoardLayout';
import PageButton from '../Button/PageButton';
import Link from 'next/link';
import setToast from '@/utils/setToast';
import { TOAST_TEXT } from '@/constants/toastText';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import NewDashboardModal from '../Modal/NewDashboardModal';
import useSlideAnimation from '@/hooks/useSlideAnimation';

type TDashboardList = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

function SideMenu() {
  const httpClient = new HttpClient(instance);
  const setIsOpen = useSetAtom(sideMenuAtom);
  const [dashboardList, setDashboardList] = useState<TDashboardList[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const [isOpenNewDashboardModal, setIsOpenNewDashboardModal] = useState(false);
  const [refElement, isOpen, renderDelayed] = useSlideAnimation(styles.close);
  const handleCreateDashboard = () => {
    setIsOpenNewDashboardModal(true);
  };
  const isFixed = id && !router.asPath.includes('edit');

  useEffect(() => {
    const handleSideMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const sideMenuRef = refElement as RefObject<HTMLDivElement>;

      if (target.dataset.state === 'sideMenuToggle') {
        setIsOpen((prev) => !prev);
        return;
      }

      if (sideMenuRef.current && !sideMenuRef.current.contains(target)) {
        setIsOpen(false);
        return;
      }
    };

    document.addEventListener('click', handleSideMenu);

    if (isOpen) {
      const getDashBoardList = async () => {
        try {
          const dashboardsData = await httpClient.get<{
            dashboards: TDashboardList[];
          }>('dashboards?navigationMethod=infiniteScroll&page=1&size=10000');
          setDashboardList(dashboardsData.dashboards);
        } catch (error: any) {
          setToast(TOAST_TEXT.error, '잠시 후 다시 시도해 주세요!');
        }
      };

      getDashBoardList();
    }

    return () => {
      document.removeEventListener('click', handleSideMenu);
    };
  }, [isOpen]);

  const handleSidemenuClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={refElement as RefObject<HTMLDivElement>}
      className={`${styles.sideMenu} ${isOpen && styles.open} ${isFixed && styles.fixed}`}
    >
      {renderDelayed && (
        <div className={styles.sideMenuBox}>
          <PageButton onClick={handleCreateDashboard}>
            새로운 대시보드
          </PageButton>
          <div className={styles.dashboardMenu}>
            <div className={styles.dashboardAddBox}>
              <span>Dash Boards</span>
            </div>
            <ul className={styles.dashboardListBox}>
              {dashboardList?.map((dashboard) => (
                <li
                  key={dashboard.id}
                  className={`${styles.dashboardList} ${id === String(dashboard.id) && styles.selected}`}
                >
                  <Link
                    className={styles.router}
                    href={`/dashboard/${dashboard.id}`}
                    onClick={() => handleSidemenuClose()}
                  >
                    <Circle color={dashboard.color} small />
                    <p className={styles.title}>{dashboard.title}</p>
                    {dashboard.createdByMe && (
                      <Image
                        src="/svgs/crown.svg"
                        alt="왕관 이미지"
                        width={20}
                        height={16}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <NewDashboardModal
        showModal={isOpenNewDashboardModal}
        handleClose={() => setIsOpenNewDashboardModal(false)}
      />
    </div>
  );
}

export default SideMenu;
