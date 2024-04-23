import Image from 'next/image';
import Link from 'next/link';
import styles from './Login.module.scss';
import { PAGE_PATH } from '@/constants/pageUrl';
import LoginForm from './components/LoginForm';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { authAtom, myStore } from '@/stores/auth';
import { setContext } from '@/apis/axios';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('로그인 페이지 ssr');
  // const dashboardlist = await axios.get('dashboardlist', {});
  setContext(context);
  // myStore.set(authAtom, (pre) => ++pre);
  return {
    props: {},
  };
}

function Login() {
  console.log('로그인 페이지 csr');
  console.log(myStore.get(authAtom));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={PAGE_PATH.MAIN} className={styles.logoLink}>
          <Image
            src="/svgs/taskify-vertical-logo.svg"
            alt="Taskify 로고"
            className={styles.logoImage}
            priority
            width={200}
            height={280}
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
  );
}

export default Login;
