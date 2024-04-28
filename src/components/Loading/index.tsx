import styles from './Loading.module.scss';
import Image from 'next/image';
import Portal from '../Modal/Potal';

const TITLE = ['T', 'a', 's', 'k', 'i', 'f', 'y', '.', '.'];

function Loading() {
  return (
    <Portal>
      <main className={styles.wrap}>
        <section className={styles.content}>
          <Image
            style={{ width: 'auto', height: 'auto' }}
            className={styles.logo}
            src="/svgs/big-logo.svg"
            width={195}
            height={220}
            alt="로고 이미지"
            priority
          />
          <h1 className={styles.title}>
            {TITLE.map((text, idx) => (
              <span key={idx} className={styles['title-effect']}>
                {text}
              </span>
            ))}
          </h1>
        </section>
      </main>
    </Portal>
  );
}

export default Loading;
