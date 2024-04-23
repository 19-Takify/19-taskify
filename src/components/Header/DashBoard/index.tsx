import Image from 'next/image';
import Link from 'next/link';
import styles from './DashBoardHeader.module.scss';
import SettngIcon from '@/svgs/setting.svg';
import InviteIcon from '@/svgs/invite.svg';
import { PAGE_PATH } from '@/constants/pageUrl';
import useIsDesiredSize from '@/hooks/useIsDesiredSize';
import { useSetAtom } from 'jotai';
import { sideMenuAtom } from '@/components/Layout/DashBoardLayout';
import { useRouter } from 'next/router';

function DashBoardHeader() {
  const setIsOpenSideMenu = useSetAtom(sideMenuAtom);
  const isTablet = useIsDesiredSize(744);
  const isBreakPoint = useIsDesiredSize(550);
  const router = useRouter();
  const isMyDashboard = !router.pathname.includes('my');
  const isEditPage = !router.pathname.includes('edit');

  const handleSideMenuToggle = () => {
    setIsOpenSideMenu((pre) => !pre);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <figure className={styles.menu} onClick={handleSideMenuToggle}>
            <Image
              src="/svgs/menu.svg"
              alt="사이드 메뉴 토글 버튼 이미지"
              width={20}
              height={15}
              priority
            />
          </figure>
          <Link href={PAGE_PATH.MY_DASHBOARD} className={styles.logo}>
            {isTablet ? (
              <Image
                width="24"
                height="28"
                src="/svgs/header-small-logo-purple.svg"
                alt="헤더 로고 이미지"
              />
            ) : (
              <Image
                src="/svgs/taskify-logo.svg"
                alt="taskify 로고 이미지"
                width={109}
                height={34}
              />
            )}
          </Link>
          <p className={styles.text}>내 대시보드11111111adsadsadsasa</p>
        </div>
        <div className={styles.box}>
          {isMyDashboard && (
            <>
              {isEditPage && (
                <Link className={styles.button} href="dashboard/edit">
                  <Image
                    className={styles.icon}
                    src={SettngIcon}
                    alt="설정 버튼 톱니바퀴 이미지"
                  />
                  {!isBreakPoint && '관리'}
                </Link>
              )}
              <button className={styles.button}>
                <Image
                  className={styles.icon}
                  src={InviteIcon}
                  alt="초대하기 버튼 플러스 이미지"
                />
                {!isBreakPoint && '초대하기'}
              </button>
            </>
          )}
          <div className={styles.box}>
            <Image
              className={styles.img}
              src=""
              alt="유저 프로필 이미지"
              width={38}
              height={38}
            />
            <div className={styles.name}>박유빈aaaaaaaaaaaaaa</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoardHeader;
