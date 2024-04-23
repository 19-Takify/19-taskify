import Image from 'next/image';
import Link from 'next/link';
import styles from './DashBoardHeader.module.scss';
import SettngIcon from '@/svgs/setting.svg';
import InviteIcon from '@/svgs/invite.svg';
import { PAGE_PATH } from '@/constants/pageUrl';
import useIsDesiredSize from '@/hooks/useIsDesiredSize';
import { useRouter } from 'next/router';
import { useState } from 'react';

function DashBoardHeader() {
  const [isOver, setIsover] = useState(false);
  const isTablet = useIsDesiredSize(744);
  const isBreakPoint = useIsDesiredSize(550);
  const router = useRouter();
  const { id } = router.query;
  const isMyDashboard = !router.pathname.includes('my');
  const isEditPage = !router.pathname.includes('edit');

  const handleMouseOver = () => {
    setIsover(true);
  };

  const handleMouseLeave = () => {
    setIsover(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <figure data-state="sideMenuToggle" className={styles.menu}>
            <Image
              data-state="sideMenuToggle"
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
                <Link className={styles.button} href={`${id}/edit`}>
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
          <div
            className={styles.box}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              className={styles.img}
              src="/svgs/logo.svg"
              alt="유저 프로필 이미지"
              width={38}
              height={38}
            />
            <div className={styles.name}>박유빈</div>
          </div>
        </div>
        {isOver && (
          <ul
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className={styles.popOver}
          >
            <Link href={PAGE_PATH.MY_PAGE}>
              <li className={styles.list}>마이페이지</li>
            </Link>
            <Link href={PAGE_PATH.MAIN}>
              <li className={styles.list}>로그아웃</li>
            </Link>
          </ul>
        )}
      </div>
    </>
  );
}

export default DashBoardHeader;
