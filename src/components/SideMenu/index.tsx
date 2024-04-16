import styles from './SideMenu.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

type DashboardList<T extends string | boolean | number> = {
  [key: string]: T;
};

type SideMenuProps = {
  dashboards: DashboardList<string | boolean | number>[];
  isOpen: boolean;
};

function SideMenu({ dashboards, isOpen }: SideMenuProps) {
  const router = useRouter();

  const handleDashboardClick = (id: number) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <div className={`${styles.sideMenu} ${isOpen && styles.open}`}>
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
            src="/svgs/taskify-logo.svg"
            alt="taskify 로고 이미지"
            width={109}
            height={34}
          />
        </div>
        <ul className={styles.dashboardListBox}>
          {dashboards.map((dashboard) => (
            <li
              key={dashboard.id as number}
              className={styles.dashboardList}
              onClick={() => handleDashboardClick(dashboard.id as number)}
            >
              <div
                className={styles.circle}
                style={{ backgroundColor: `${dashboard.color}` }}
              />
            </div>
            <ul className={styles.dashboardListBox}>
              {dashboards.map((dashboard) => (
                <li
                  key={dashboard.id as number}
                  className={styles.dashboardList}
                  onClick={() => handleDashboardClick(dashboard.id as number)}
                >
                  <div
                    className={styles.circle}
                    style={{ backgroundColor: `${dashboard.color}` }}
                  />
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
