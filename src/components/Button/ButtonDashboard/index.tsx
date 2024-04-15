import { ButtonHTMLAttributes } from 'react';
import styles from './ButtonDashboard.module.scss';
import Image from 'next/image';

type ButtonDashboardProps<T> = {
  dashboard: Record<string, T>;
  createdByMe: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonDashboard({
  dashboard,
  createdByMe,
  ...rest
}: ButtonDashboardProps<string>) {
  return (
    <button className={styles.dashboard} {...rest}>
      <div className={styles.dashboardText}>
        <div className={styles.dashboardName}>
          <div
            className={styles.circle}
            style={{ backgroundColor: `${dashboard.color}` }}
          />
          <p>{dashboard.title}</p>
          {createdByMe && (
            <Image
              src="/svgs/crown.svg"
              alt="crown 이미지"
              width={20}
              height={16}
            />
          )}
        </div>
        <Image
          src="/svgs/arrow.svg"
          alt="arrow 이미지"
          width={18}
          height={18}
        />
      </div>
    </button>
  );
}

export default ButtonDashboard;
