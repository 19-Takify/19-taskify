import PageButton from '@/components/Button/PageButton';
import styles from './InvitedDashboard.module.scss';
import Image from 'next/image';
import SearchDashboard from '../SearchDashboard';
import { Dispatch, SetStateAction, useState } from 'react';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import setToast from '@/utils/setToast';

type Invitation = {
  id: number;
  inviter: { nickname: string; email: string; id: number };
  teamId: string;
  dashboard: { title: string; id: number };
  invitee: { nickname: string; email: string; id: number };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

type DashboardList = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

type InvitedDashboardProps = {
  invitations: Invitation[];
  setInvitations: Dispatch<SetStateAction<Invitation[]>>;
};

function InvitedDashboard({
  invitations,
  setInvitations,
}: InvitedDashboardProps) {
  const httpClient = new HttpClient(instance);
  const [isSearch, setIsSearch] = useState(false);

  const handleConfirmClick = async (invitationId: number) => {
    const dashboardData = await httpClient.get<{ dashboards: DashboardList[] }>(
      '/dashboards?navigationMethod=infiniteScroll',
    );
    const findInvitation = invitations.find((invitation) => {
      return invitation.id === invitationId;
    });

    const duplicatedDashboard = dashboardData.dashboards.some((dashboard) => {
      return dashboard.id === findInvitation?.dashboard.id;
    });

    if (duplicatedDashboard) {
      setToast('error', '이미 초대 받은 대시보드 입니다');
      handleDenyClick(invitationId);
      return;
    }

    try {
      await httpClient.put(`/invitations/${invitationId}`, {
        inviteAccepted: true,
      });
      const updateData = (await httpClient.get('/invitations')) as {
        invitations: Invitation[];
      };
      setInvitations(updateData.invitations);
      setToast('success', '초대 수락에 성공 했습니다.');
    } catch {
      setToast('error', '초대 수락에 실패 했습니다.');
    }
  };

  const handleDenyClick = async (invitationId: number) => {
    try {
      await httpClient.put(`/invitations/${invitationId}`, {
        inviteAccepted: false,
      });
      const updateData = (await httpClient.get('/invitations')) as {
        invitations: Invitation[];
      };
      setInvitations(updateData.invitations);
    } catch {
      setToast('error', '초대 거절에 실패 했습니다.');
    }
  };

  return (
    <div className={styles.invitedDashboard}>
      <strong>초대받은 대시보드</strong>
      {invitations.length || isSearch ? (
        <div>
          <SearchDashboard
            setInvitations={setInvitations}
            setIsSearch={setIsSearch}
          />
          <ul>
            <li>
              <div className={`${styles.invitedBox} ${styles.title}`}>
                <p>이름</p>
                <p>초대자</p>
                <div className={styles.invitedButton}>수락 여부</div>
              </div>
            </li>
            {invitations.map((invitation) => (
              <li key={invitation.id}>
                <div className={styles.invitedBox}>
                  <p>{invitation.dashboard.title}</p>
                  <p>{invitation.inviter.nickname}</p>
                  <div className={styles.invitedButton}>
                    <PageButton
                      onClick={() => handleConfirmClick(invitation.id)}
                    >
                      수락
                    </PageButton>
                    <PageButton onClick={() => handleDenyClick(invitation.id)}>
                      거절
                    </PageButton>
                  </div>
                </div>
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
            priority
          />
          <p className={styles.text}>
            <span>아직 초대받은</span>
            <span> 대시보드가 없어요</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default InvitedDashboard;
