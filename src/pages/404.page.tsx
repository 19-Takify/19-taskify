import Image from 'next/image';
import styles from './404.module.scss';
import { useRouter } from 'next/navigation';
import { PAGE_PATH } from '@/constants/pageUrl';

function Custom404() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(PAGE_PATH.MY_DASHBOARD);
  };

  return (
    <main className={styles.wrap}>
      <section className={styles.content}>
        <Image
          className={styles.logo}
          src="/svgs/black-logo.svg"
          width="235"
          height="260"
          alt="로고 이미지"
          priority
        />
        <h2 className={styles.text}>
          4<span className={styles.textEffect}>0</span>4 Not Found
        </h2>
        <h2 className={styles.text}>존재하지 않는 페이지 입니다.</h2>
        <button onClick={() => handleButtonClick()} className={styles.button}>
          메인 페이지로 이동
        </button>
      </section>
    </main>
  );
}

export default Custom404;
