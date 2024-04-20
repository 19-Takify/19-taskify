import PageButton from '@/components/Button/PageButton';
import styles from './InvitedDashboard.module.scss';
import Image from 'next/image';
import SearchDashboard from '../SearchDashboard';
import { useState } from 'react';
//import useInfiniteScroll from '@/hooks/useInfiniteScroll';

type InvitedDashboardProps = {
  invitation: {
    id: number;
    inviter: {
      nickname: string;
      email: string;
      id: number;
    };
    teamId: string;
    dashboard: {
      title: string;
      id: number;
    };
    invitee: {
      nickname: string;
      email: string;
      id: number;
    };
    inviteAccepted: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
};

function InvitedDashboard({ invitation }: InvitedDashboardProps) {
  /*
  //무한 스크롤 할 때
  const [startIndex, setStartIndex] = useState(0);

  // 무한 스크롤을 위한 콜백 함수
  const handleInfiniteScroll = () => {
    const nextIndex = startIndex + 0;
    if (nextIndex > 16) return;
    setStartIndex(nextIndex); // 시작 인덱스 업데이트
    // 다음 데이터를 가져와서 상태를 업데이트
    setInvitations([
      ...invitations,
      ...test.invitations.slice(nextIndex, nextIndex + 0),
    ]);
  };

  // 무한 스크롤 훅을 사용하여 handleInfiniteScroll 콜백을 연결
  const sentinelRef = useInfiniteScroll(handleInfiniteScroll);
  */

  const [invitations, setInvitations] = useState(invitation);

  const handleConfirmClick = () => {
    //invitation.id 로 초대 응답 api
  };

  const handleDenyClick = () => {
    //invitation.id 로 초대 취소 api
  };

  return (
    <div className={styles.invitedDashboard}>
      <strong>초대받은 대시보드</strong>
      {invitations.length ? (
        <div>
          <SearchDashboard
            invitations={invitations}
            setInvitations={setInvitations}
          />
          <ul>
            <li>
              <div className={`${styles.invitedBox} ${styles.title}`}>
                <p>이름</p>
                <p>초대자</p>
                <div className={styles.invitedButton}>수락 여부</div>
              </div>
            </li>
            {invitations.map((invitation, index) => (
              <li key={index}>
                <div className={styles.invitedBox}>
                  <p>{invitation.dashboard.title}</p>
                  <p>{invitation.inviter.nickname}</p>
                  <div className={styles.invitedButton}>
                    <PageButton onClick={handleConfirmClick}>수락</PageButton>
                    <PageButton onClick={handleDenyClick}>거절</PageButton>
                  </div>
                </div>
                {/*
                  //무한 스크롤
                  index === invitation.length - 1 && (
                  <div ref={sentinelRef}></div>
                )*/}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.noInvited}>
          <Image
            src="/svgs/unsubscribe.svg"
            alt="초대 받지 못한 메시지 이미지"
            width={100}
            height={100}
          />
          <p>아직 초대받은 대시보드가 없어요</p>
        </div>
      )}
    </div>
  );
}

export default InvitedDashboard;
