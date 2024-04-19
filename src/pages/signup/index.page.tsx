import Image from 'next/image';
import Link from 'next/link';
import styles from './Signup.module.scss';
import SignupForm from '@/pages/signup/components/SignupForm';

function Signup() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            src="/svgs/taskify-vertical-logo.svg"
            alt="Taskify"
            width={200}
            height={280}
          />
        </Link>
        <h1 className={styles.title}>첫 방문을 환영합니다!</h1>
      </header>
      <SignupForm />
      <footer>
        <p className={styles.footerMessage}>
          이미 가입하셨나요?
          <Link href="/login" className={styles.link}>
            로그인하기
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default Signup;
