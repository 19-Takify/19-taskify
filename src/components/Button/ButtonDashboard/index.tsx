import { ButtonHTMLAttributes } from 'react';
import styles from './ButtonDashboard.module.scss';

type ButtonDashboardProps = {
  del: boolean;
  add: boolean;
  dashboard: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonDashboard({
  del = false,
  add = false,
  dashboard = false,
  ...rest
}: ButtonDashboardProps) {
  return (
    <button className={styles.buttonDashboard} {...rest}>
      {/* 대시보드 삭제하기 */}
      {del && <p>대시보드 삭제하기</p>}
      {/* 새로운 대시보드 */}
      {add && <p>새로운 대시보드</p>}
      {/* 대시보드 */}
      {dashboard && <div>대시보드 내용</div>}
    </button>
  );
}

export default ButtonDashboard;
