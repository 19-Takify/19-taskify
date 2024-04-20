import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Circle from '@/components/Circle';
import styles from './SideMenu.module.scss';
import Image from 'next/image';

type DashboardList<T extends string | boolean | number> = {
  [key: string]: T;
};

type SideMenuProps = {
  dashboards: DashboardList<string | boolean | number>[];
  isOpen: boolean;
};

function SideMenu({ dashboards, isOpen }: SideMenuProps) {
  const router = useRouter();
  const [renderDelayed, setRenderDelayed] = useState(false);

  const handleDashboardClick = (id: number) => {
    //페이지 이동
    router.push(`/dashboard/${id}`);
  };

  useEffect(() => {
    //렌더링시 0.4초 뒤에 작동 >> 초기 애니메이션 제거
    const timeout = setTimeout(() => {
      setRenderDelayed(true);
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`${styles.sideMenu} ${isOpen && styles.open}`}>
      {renderDelayed && (
        <div className={styles.sideMenuBox}>
          <Image
            src="/svgs/taskify-logo.svg"
            alt="taskify 로고 이미지"
            width={109}
            height={34}
          />
          <div className={styles.dashboardMenu}>
            <div className={styles.dashboardAddBox}>
              <span>Dash Boards</span>
              <Image
                src="/svgs/add-box.svg"
                alt="대시보드 추가 이미지"
                width={20}
                height={20}
              />
            </div>
            <ul className={styles.dashboardListBox}>
              {dashboards.map((dashboard) => (
                <li
                  key={dashboard.id as number}
                  className={styles.dashboardList}
                  onClick={() => handleDashboardClick(dashboard.id as number)}
                >
                  <Circle color={dashboard.color as string} small />
                  <p>{dashboard.title}</p>
                  {dashboard.createdByMe && (
                    <Image
                      src="/svgs/crown.svg"
                      alt="crown 이미지"
                      width={20}
                      height={16}
                    />
                  )}
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
