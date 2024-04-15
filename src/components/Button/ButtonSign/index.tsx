import { ButtonHTMLAttributes } from 'react';
import styles from './ButtonSign.module.scss';

type ButtonSignProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonSign({ children, ...rest }: ButtonSignProps) {
  return (
    <button className={styles.buttonSign} {...rest}>
      {children}
    </button>
  );
}

export default ButtonSign;
