import { ButtonHTMLAttributes } from 'react';
import styles from './ButtonAddCard.module.scss';

type ButtonAddCardProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonAddCard({ ...rest }: ButtonAddCardProps) {
  return (
    <button className={styles.buttonAddCard} {...rest}>
      +
    </button>
  );
}

export default ButtonAddCard;
