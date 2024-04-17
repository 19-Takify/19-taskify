import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import Image from 'next/image';

type ButtonSignProps = {
  usage: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonType<T extends string> = {
  [key in T]: { [key in T]: T };
};

function Button({ usage, ...rest }: ButtonSignProps) {
  const BUTTON_TYPE: ButtonType<string> = {
    signin: { text: '로그인', style: 'sign' },
    signup: { text: '가입하기', style: 'sign' },
    card: {
      text: '',
      style: 'card',
      image: '/svgs/add.svg',
      alt: '추가 아이콘',
    },
    column: {
      text: '새로운 컬럼 추가하기',
      style: 'column',
      image: '/svgs/add.svg',
      alt: '추가 아이콘',
    },
    confirm: { text: '수락', style: 'confirm' },
    deny: { text: '거절', style: 'deny' },
    delete: { text: '삭제', style: 'delete' },
    dashboardAdd: {
      text: '새로운 대시보드',
      style: 'dashboard',
      image: '/svgs/add.svg',
      alt: '추가 아이콘',
    },
    dashboardRemove: { text: '대시보드 삭제하기', style: 'dashboard' },
    modalInput: { text: '생성', style: 'modal' },
    modalCheck: { text: '확인', style: 'modal' },
    modalProduce: { text: '생성', style: 'modal' },
    modalFix: { text: '수정', style: 'modal' },
    modalChange: { text: '변경', style: 'modal' },
    modalDelete: { text: '삭제', style: 'modal' },
    modalCancel: { text: '취소', style: 'modalCancel' },
  };

  return (
    <button className={styles[BUTTON_TYPE[usage].style]} {...rest}>
      <div className={styles.buttonText}>
        <p>{BUTTON_TYPE[usage].text}</p>
        {BUTTON_TYPE[usage].image ? (
          <Image
            src={`${BUTTON_TYPE[usage].image}`}
            alt={`${BUTTON_TYPE[usage].alt}`}
            width={16}
            height={16}
          />
        ) : null}
      </div>
    </button>
  );
}

export default Button;
