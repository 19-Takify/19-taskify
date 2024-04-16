import { ButtonHTMLAttributes } from 'react';
import styles from './ButtonDashboard.module.scss';
import Image from 'next/image';

type ButtonDashboardProps<T> = {
  dashboards: { [key: string]: T };
  arrow?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonDashboard({
  dashboards,
  arrow = false,
  ...rest
}: ButtonDashboardProps<string | boolean | number>) {
  return (
    <button className={styles.dashboard} {...rest}>
      <div className={styles.dashboardText}>
        <div className={styles.dashboardName}>
          <div
            className={styles.circle}
            style={{ backgroundColor: `${dashboards.color}` }}
          />
          <p>{dashboards.title}</p>
          {dashboards.createdByMe && (
            <Image
              src="/svgs/crown.svg"
              alt="crown 이미지"
              width={20}
              height={16}
            />
          )}
        </div>
        {arrow && (
          <Image
            src="/svgs/arrow.svg"
            alt="arrow 이미지"
            width={18}
            height={18}
          />
        )}
      </div>
    </button>
  );
}

export default ButtonDashboard;
