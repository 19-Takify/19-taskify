import styles from './Error.module.scss';
import Image from 'next/image';

function Error() {
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
          <span className={styles['text-effect']}>에러</span>가 발생하였습니다!
        </h2>
        <h2 className={styles.text}>
          새로고침 후 <span className={styles['text-effect']}>다시 접속 </span>
          바랍니다.
        </h2>
      </section>
    </main>
  );
}

export default Error;
