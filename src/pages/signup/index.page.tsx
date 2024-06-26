import Image from 'next/image';
import Link from 'next/link';
import styles from './Signup.module.scss';
import SignupForm from '@/pages/signup/components/SignupForm';
import { PAGE_PATH } from '@/constants/pageUrl';
import Meta from '@/components/Meta';
import useCurrentUrl from '@/hooks/useCurrentUrl';

function Signup() {
  return (
    <>
      <Meta title="Taskify | 회원가입" url={useCurrentUrl()} />
      <div className={styles.background} />
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href={PAGE_PATH.MAIN}>
            <Image
              src="/svgs/taskify-vertical-logo.svg"
              alt="Taskify 로고"
              className={styles.logoImage}
              width={200}
              height={280}
              priority
            />
          </Link>
          <h2 className={styles.title}>첫 방문을 환영합니다!</h2>
        </header>
        <SignupForm />
        <footer>
          <p className={styles.footerMessage}>
            이미 가입하셨나요?
            <Link href={PAGE_PATH.LOGIN} className={styles.link}>
              로그인하기
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}

export default Signup;
