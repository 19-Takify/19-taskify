import Image from 'next/image';
import Link from 'next/link';
import styles from './Login.module.scss';
import { PAGE_PATH } from '@/constants/pageUrl';
import LoginForm from './components/LoginForm';
import Meta from '@/components/Meta';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import Loading from '@/components/Loading';
import { useRouterLoading } from '@/hooks/useRouterLoading';

function Login() {
  const url = useCurrentUrl();
  const isLoading = useRouterLoading();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Meta title="Taskify | 로그인" url={url} />
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href={PAGE_PATH.MAIN}>
            <Image
              src="/svgs/taskify-vertical-logo.svg"
              alt="Taskify 로고 이미지"
              className={styles.logoImage}
              width={200}
              height={280}
              priority
            />
          </Link>
          <h2 className={styles.title}>오늘도 만나서 반가워요! </h2>
        </header>
        <LoginForm />
        <footer>
          <p className={styles.footerMessage}>
            회원이 아니신가요?
            <Link href={PAGE_PATH.SIGNUP} className={styles.link}>
              회원가입하기
            </Link>
          </p>
        </footer>
      </div>
    </>
  );
}

export default Login;
