import Image from 'next/image';
import styles from './DashBoardHeader.module.scss';
import MenuIcon from '@/svgs/menu.svg';
import SettngIcon from '@/svgs/setting.svg';
import InviteIcon from '@/svgs/invite.svg';
import { useSetAtom } from 'jotai';
import { sideMenuAtom } from '@/components/Layout/DashBoardLayout';

function DashBoardHeader() {
  const setIsOpenSideMenu = useSetAtom(sideMenuAtom);

  const handleSideMenuToggle = () => {
    setIsOpenSideMenu((pre) => !pre);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <Image
            className={styles.menu}
            src={MenuIcon}
            alt="menu"
            onClick={handleSideMenuToggle}
          />
          <div className={styles.text}>내 대시보드</div>
        </div>
        <div className={styles.box}>
          <button className={styles.button}>
            <Image
              className={styles.icon}
              src={SettngIcon}
              alt="톱니바퀴 이미지"
            />
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

export default DashBoardHeader;
