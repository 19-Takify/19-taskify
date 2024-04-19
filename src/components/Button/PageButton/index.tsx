import { ButtonHTMLAttributes } from 'react';
import styles from './PageButton.module.scss';
import Image from 'next/image';

type PageButtonSignProps = {
  children?: keyof typeof PAGE_BUTTON_TYPE;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type PageButtonType<T extends string> = {
  [key in T]: { [key in T]: T };
};

const PAGE_BUTTON_TYPE: PageButtonType<string> = {
  로그인: { style: 'sign' },
  가입하기: { style: 'sign' },
  카드: {
    text: '',
    style: 'card',
    image: '/svgs/add.svg',
    alt: '추가 아이콘',
  },
  수락: { style: 'confirm' },
  거절: { style: 'deny' },
  삭제: { style: 'delete' },
  '새로운 대시보드': {
    style: 'dashboard',
    image: '/svgs/add.svg',
    alt: '추가 아이콘',
  },
  '대시보드 삭제하기': { text: '대시보드 삭제하기', style: 'dashboard' },
  '새로운 컬럼 추가하기': {
    style: 'column',
    image: '/svgs/add.svg',
    alt: '추가 아이콘',
  },
  default: { style: 'default' },
};

function PageButton({ children, ...rest }: PageButtonSignProps) {
  const typeCheck = children ?? 'default';

  return (
    <button
      className={`${styles[PAGE_BUTTON_TYPE[typeCheck]?.style] ?? styles.default}`}
      {...rest}
    >
      <div className={styles.buttonText}>
        {PAGE_BUTTON_TYPE[typeCheck]?.text ?? children}
        {PAGE_BUTTON_TYPE[typeCheck]?.image ? (
          <Image
            src={`${PAGE_BUTTON_TYPE[typeCheck]?.image}`}
            alt={`${PAGE_BUTTON_TYPE[typeCheck]?.alt}`}
            width={16}
            height={16}
          />
        ) : null}
      </div>
    </button>
  );
}

export default PageButton;
