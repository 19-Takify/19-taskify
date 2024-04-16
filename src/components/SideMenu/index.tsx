import ButtonDashboard from '../Button/ButtonDashboard';
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
  return (
    <div className={`${styles.sideMenu} ${isOpen && styles.open}`}>
      <div className={styles.sideMenuLogo}>
        <Image
          src="/svgs/taskify-logo.svg"
          alt="taskify logo 이미지"
          width={29}
          height={33}
        />
        <Image
          src="/svgs/taskify.svg"
          alt="taskify 이미지"
          width={80}
          height={22}
        />
      </div>
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
          {dashboards.map((dashboard, index) => (
            <li key={index} className={styles.dashboardList}>
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
  );
}

export default SideMenu;
