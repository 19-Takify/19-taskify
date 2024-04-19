import Image from 'next/image';
import styles from './LoginHeader.module.scss';
import Logo from '/public/svgs/logo.svg';
import Taskify from '/public/svgs/taskify.svg';

function LoginHeader() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src={Logo} alt="logo" />
          <Image className={styles.tastify} src={Taskify} alt="tastify" />
        </div>
        <div className={styles.box}>
          <button className={styles.button}>로그인</button>
          <button className={styles.button}>회원가입</button>
        </div>
      </div>
    </>
  );
}

export default LoginHeader;
