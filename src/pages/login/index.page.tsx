import Image from 'next/image';
import Link from 'next/link';
import styles from './Login.module.scss';
import { PAGE_PATH } from '@/constants/pageUrl';
import LoginForm from './components/LoginForm';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { User, authAtom, initialUser, myStore, ssrUser } from '@/stores/auth';
import { setContext } from '@/apis/axios';
import axios from '@/apis/axios';
import { getMe } from '@/utils/getMe';
import { useHydrateAtoms } from 'jotai/utils';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import useUserForPage from '@/hooks/useUserForPage';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('로그인 페이지 ssr');
  // const dashboardlist = await axios.get('dashboardlist', {});
  setContext(context);
  let user = initialUser;
  try {
    const nextUser = await getMe();
    user = nextUser;
  } catch (error) {
    console.error(error);
  }
  return {
    props: { user },
  };
}

type LoginProps = {
  user: User;
};

function Login({ user }: LoginProps) {
  const userAtom = useUserForPage(user);
  console.log('렌더링 userAtom: ', userAtom);

  useEffect(() => {
    const interval = setInterval(() => console.log('유저: ', userAtom), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
        <h2 className={styles.title}>
          Login Page 유저 이름: {userAtom.nickname}
        </h2>
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
