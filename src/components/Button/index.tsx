import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';
import Image from 'next/image';

type ButtonSignProps = {
  usage: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonType = {
  [key: string]: {
    text: string;
    style: string;
    image?: string;
  };
};

function Button({ usage, ...rest }: ButtonSignProps) {
  const BUTTON_TYPE: ButtonType = {
    signin: {
      text: '로그인',
      style: 'sign',
    },
    signup: {
      text: '가입하기',
      style: 'sign',
    },
    card: {
      text: '',
      style: 'card',
      image: '/svgs/add.svg',
    },
    column: {
      text: '새로운 컬럼 추가하기',
      style: 'column',
      image: '/svgs/add.svg',
    },
    confirm: {
      text: '수락',
      style: 'confirm',
    },
    deny: {
      text: '거절',
      style: 'deny',
    },
    delete: {
      text: '삭제',
      style: 'delete',
    },
    dashboard: {
      text: '',
      style: 'dashboard',
    },
    dashboardAdd: {
      text: '새로운 대시보드',
      style: 'dashboard',
      image: '/svgs/add.svg',
    },
    dashboardRemove: {
      text: '대시보드 삭제하기',
      style: 'dashboard',
    },
  };

  return (
    <button className={styles[BUTTON_TYPE[usage].style]} {...rest}>
      {usage === 'dashboard' ? (
        <div className={styles.dashboardText}>
          <div className={styles.dashboardName}>
            <Image
              src="/svgs/ellipse.svg"
              alt="arrow 이미지"
              width={8}
              height={8}
            />
            <p>대시보드 이름</p>
            <Image
              src="/svgs/crown.svg"
              alt="arrow 이미지"
              width={20}
              height={16}
            />
          </div>
          <Image
            src="/svgs/arrow.svg"
            alt="arrow 이미지"
            width={18}
            height={18}
          />
        </div>
      ) : (
        <div className={styles.buttonText}>
          <p>{BUTTON_TYPE[usage].text}</p>
          {BUTTON_TYPE[usage].image ? (
            <Image
              src={BUTTON_TYPE[usage].image as string}
              alt={`${BUTTON_TYPE[usage].text} 이미지`}
              width={16}
              height={16}
            />
          ) : null}
        </div>
      )}
    </button>
  );
}

export default Button;
