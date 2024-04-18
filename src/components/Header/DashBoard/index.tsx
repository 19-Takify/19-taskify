import Image from 'next/image';
import styles from './DashBoard.module.scss';
import MenuIcon from '/public/svgs/menu.svg';
import SettngIcon from '/public/svgs/setting.svg';
import InviteIcon from '/public/svgs/invite.svg';

function DashBoard() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <Image className={styles.menu} src={MenuIcon} alt="menu" />
          <div className={styles.text}>내 대시보드</div>
        </div>
        <div className={styles.box}>
          <button className={styles.button}>
            <Image className={styles.icon} src={SettngIcon} alt="setting" />
            관리
          </button>
          <button className={styles.button}>
            <Image className={styles.icon} src={InviteIcon} alt="invite" />
            초대하기
          </button>
          <div className={styles.box}>
            <div className={styles.img}></div>
            <div className={styles.name}>박유빈</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
