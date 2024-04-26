import { useAtom } from 'jotai';
import Circle from '@/components/Circle';
import styles from './SideMenu.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { sideMenuAtom } from '@/utils/jotai';
import PageButton from '../Button/PageButton';
import Link from 'next/link';

type DashboardList<T extends string | boolean | number> = {
  [key: string]: T;
};

type SideMenuProps = {
  dashboards?: DashboardList<string | boolean | number>[];
};

function SideMenu({ dashboards }: SideMenuProps) {
  const [isOpen, setIsOpen] = useAtom(sideMenuAtom);
  const [isFirstRender, setIsFirstRender] = useState(false);
  const [renderDelayed, setRenderDelayed] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;

  const handleCreateDashboard = () => {
    // 추후 대시보드 생성 모달 로직 추가
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

    return () => {
      document.removeEventListener('click', handleSideMenu);
      clearTimeout(timeout);
    };
  }, [isOpen]);

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
              {dashboards?.map((dashboard) => (
                <li
                  key={dashboard.id as number}
                  className={`${styles.dashboardList} ${id === String(dashboard.id) && styles.selected}`}
                >
                  <Link
                    className={styles.router}
                    href={`/dashboard/${dashboard.id}`}
                  >
                    <Circle color={dashboard.color as string} small />
                    <p>{dashboard.title}</p>
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
    </div>
  );
}

export default SideMenu;
