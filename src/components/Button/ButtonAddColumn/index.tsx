import { ButtonHTMLAttributes } from 'react';
import styles from './ButtonAddColumn.module.scss';

type ButtonAddColumnProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonAddColumn({ ...rest }: ButtonAddColumnProps) {
  return (
    <button className={styles.buttonAddColumn} {...rest}>
      새로운 컬럼 추가하기
    </button>
  );
}

export default ButtonAddColumn;
