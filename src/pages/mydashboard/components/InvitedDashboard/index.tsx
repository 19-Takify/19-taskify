import PageButton from '@/components/Button/PageButton';
import styles from './InvitedDashboard.module.scss';
import Image from 'next/image';
import SearchDashboard from '../SearchDashboard';
import { Dispatch, SetStateAction } from 'react';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';

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

type InvitedDashboardProps = {
  initialInvitations: Invitation[];
  invitations: Invitation[];
  setInvitations: Dispatch<SetStateAction<Invitation[]>>;
};

function InvitedDashboard({
  initialInvitations,
  invitations,
  setInvitations,
}: InvitedDashboardProps) {
  const handleConfirmClick = async (invitationId: number) => {
    const httpClient = new HttpClient(instance);
    await httpClient.put(`/invitations/${invitationId}`, {
      inviteAccepted: true,
    });
    const updateData = (await httpClient.get('/invitations')) as {
      invitations: Invitation[];
    };
    setInvitations(updateData.invitations);
  };

  const handleDenyClick = async (invitationId: number) => {
    const httpClient = new HttpClient(instance);
    await httpClient.put(`/invitations/${invitationId}`, {
      inviteAccepted: false,
    });
    const updateData = (await httpClient.get('/invitations')) as {
      invitations: Invitation[];
    };
    setInvitations(updateData.invitations);
  };

  return (
    <div className={styles.invitedDashboard}>
      <strong>초대받은 대시보드</strong>
      {initialInvitations.length ? (
        <div>
          <SearchDashboard
            initialInvitations={initialInvitations}
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
          />
          <p>아직 초대받은 대시보드가 없어요</p>
        </div>
      )}
    </div>
  );
}

export default InvitedDashboard;
