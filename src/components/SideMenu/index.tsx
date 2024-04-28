import Circle from '@/components/Circle';
import { useAtom, useSetAtom } from 'jotai';
import styles from './SideMenu.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { sideMenuAtom } from '../Layout/DashBoardLayout';
import PageButton from '../Button/PageButton';
import Link from 'next/link';
import axios from '@/apis/axios';
import setToast from '@/utils/setToast';
import { TOAST_TEXT } from '@/constants/toastText';
import { selectDashboardAtom } from '@/store/dashboard';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import NewDashboardModal from '../Modal/NewDashboardModal';

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
  const [isOpen, setIsOpen] = useAtom(sideMenuAtom);
  const setSelectDashboard = useSetAtom(selectDashboardAtom);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [renderDelayed, setRenderDelayed] = useState(false);
  const [dashboardList, setDashboardList] = useState<TDashboardList[]>([]);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const [isOpenNewDashboardModal, setIsOpenNewDashboardModal] = useState(false);

  const handleCreateDashboard = () => {
    setIsOpenNewDashboardModal(true);
  };

  useEffect(() => {
    const handleSideMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.dataset.state === 'sideMenuToggle') {
        setIsOpen((prev) => !prev);
        return;
      }

      if (sideMenuRef.current && !sideMenuRef.current.contains(target)) {
        setIsOpen(false);
        return;
      }
    };

    // 첫 렌더링 시에는 slideOut 애니메이션 작동 x
    setIsFirstRender(true);

    if (isFirstRender && !isOpen) {
      sideMenuRef.current?.classList.add(styles.close);
    }

    document.addEventListener('click', handleSideMenu);

    //렌더링시 0.4초 뒤에 작동 >> 초기 애니메이션 제거
    const timeout = setTimeout(() => {
      setRenderDelayed(true);
    }, 400);

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
      clearTimeout(timeout);
    };
  }, [isOpen]);

  const handleDashboardClick = async (id: number) => {
    try {
      const res = await axios.get(`dashboards/${id}`);
      setSelectDashboard(res.data);
      setIsOpen(false);
    } catch (e) {
      setToast(TOAST_TEXT.error, '잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div
      ref={sideMenuRef}
      className={`${styles.sideMenu} ${isOpen && styles.open} `}
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
                  onClick={() => handleDashboardClick(dashboard.id)}
                >
                  <Link
                    className={styles.router}
                    href={`/dashboard/${dashboard.id}`}
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
