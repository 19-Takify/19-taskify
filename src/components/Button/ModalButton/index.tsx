import { ButtonHTMLAttributes } from 'react';
import styles from './ModalButton.module.scss';
import Image from 'next/image';

type ModalButtonSignProps = {
  children?: keyof typeof MODAL_BUTTON_TYPE;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ModalButtonType<T extends string> = {
  [key in T]: { [key in T]: T };
};

const MODAL_BUTTON_TYPE: ModalButtonType<string> = {
  생성: { style: 'modal' },
  확인: { style: 'modal' },
  수정: { style: 'modal' },
  변경: { style: 'modal' },
  삭제: { style: 'modal' },
  취소: { style: 'modalCancel' },
  default: { style: 'default' },
};

function ModalButton({ children, className, ...rest }: ModalButtonSignProps) {
  const typeCheck = children ?? 'default';

  return (
    <button
      className={`${styles[MODAL_BUTTON_TYPE[typeCheck]?.style] ?? styles.default} ${className}`}
      {...rest}
    >
      <div className={styles.buttonText}>
        {MODAL_BUTTON_TYPE[typeCheck]?.text ?? children}
        {MODAL_BUTTON_TYPE[typeCheck]?.image ? (
          <Image
            src={`${MODAL_BUTTON_TYPE[typeCheck]?.image}`}
            alt={`${MODAL_BUTTON_TYPE[typeCheck]?.alt}`}
            width={16}
            height={16}
          />
        ) : null}
      </div>
    </button>
  );
}

export default ModalButton;
