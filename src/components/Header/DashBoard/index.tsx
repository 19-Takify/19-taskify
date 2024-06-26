import Image from 'next/image';
import Link from 'next/link';
import styles from './DashBoardHeader.module.scss';
import SettngIcon from '@/svgs/setting.svg';
import InviteIcon from '@/svgs/invite.svg';
import { PAGE_PATH } from '@/constants/pageUrl';
import useIsDesiredSize from '@/hooks/useIsDesiredSize';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { logout } from '@/utils/auth';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/store/auth';
import { selectDashboardAtom } from '@/store/dashboard';
import InviteDashBoardModal from '@/components/Modal/InviteDashboardModal';

function DashBoardHeader() {
  const [isOver, setIsover] = useState(false);
  const isTablet = useIsDesiredSize(744);
  const isBreakPoint = useIsDesiredSize(550);
  const router = useRouter();
  const { id } = router.query;
  const isMyDashboard = !router.pathname.includes('my');
  const isEditPage = !router.pathname.includes('edit');
  const user = useAtomValue(userAtom);
  const selectDashboard = useAtomValue(selectDashboardAtom);
  const [isOpenInviteModal, setIsOpenInviteModal] = useState(false);

  const handleMouseOver = () => {
    setIsover(true);
  };

  const handleMouseLeave = () => {
    setIsover(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleInviteDashboard = () => {
    setIsOpenInviteModal(true);
  };

  return (
    <>
      <header className={styles.container}>
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
                priority
              />
            ) : (
              <Image
                src="/svgs/taskify-logo.svg"
                alt="taskify 로고 이미지"
                width={109}
                height={34}
                priority
              />
            )}
          </Link>
          {isMyDashboard && (
            <p className={styles.text}>{selectDashboard.title}</p>
          )}
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
              {user.id === selectDashboard.userId && (
                <button
                  className={styles.button}
                  onClick={handleInviteDashboard}
                >
                  <Image
                    className={styles.icon}
                    src={InviteIcon}
                    alt="초대하기 버튼 플러스 이미지"
                  />
                  {!isBreakPoint && '초대하기'}
                </button>
              )}
            </>
          )}
          <div
            className={styles.box}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              className={styles.img}
              src={user?.profileImageUrl || '/svgs/default-profile.svg'}
              alt="유저 프로필 이미지"
              width={38}
              height={38}
            />
            <div className={styles.name}>{user?.nickname}</div>
          </div>
        </div>
        {isOver && (
          <ul
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className={styles.popOver}
          >
            <li className={styles.list}>
              <Link className={styles.listBtn} href={PAGE_PATH.MY_PAGE}>
                마이페이지
              </Link>
            </li>
            <li className={styles.list}>
              <button
                type="button"
                onClick={handleLogout}
                className={styles.listBtn}
              >
                로그아웃
              </button>
            </li>
          </ul>
        )}
      </header>
      <InviteDashBoardModal
        showModal={isOpenInviteModal}
        handleClose={() => setIsOpenInviteModal(false)}
        dashboardId={selectDashboard.id}
      />
    </>
  );
}

export default DashBoardHeader;
