import { useState } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import PageButton from '@/components/Button/PageButton';
import styles from './InvitedDashboard.module.scss';
import { test } from './test';

function InvitedDashboard() {
  const [invitations, setInvitations] = useState(test.invitations.slice(0, 8));
  const [startIndex, setStartIndex] = useState(0); // 초기에 보여줄 데이터의 시작 인덱스

  // 무한 스크롤을 위한 콜백 함수
  const handleInfiniteScroll = () => {
    const nextIndex = startIndex + 8;
    if (nextIndex > 16) return;
    setStartIndex(nextIndex); // 시작 인덱스 업데이트
    // 다음 데이터를 가져와서 상태를 업데이트
    setInvitations([
      ...invitations,
      ...test.invitations.slice(nextIndex, nextIndex + 8),
    ]);
  };

  // 무한 스크롤 훅을 사용하여 handleInfiniteScroll 콜백을 연결
  const sentinelRef = useInfiniteScroll(handleInfiniteScroll);

  return (
    <div className={styles.invitedDashboard}>
      <strong>초대받은 대시보드</strong>
      <div>검색</div>
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
                <PageButton>수락</PageButton>
                <PageButton>거절</PageButton>
              </div>
            </div>
            {index === invitations.length - 1 && <div ref={sentinelRef}></div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvitedDashboard;
