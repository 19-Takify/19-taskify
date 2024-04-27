import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement, useState, useEffect } from 'react';
import InvitedDashboard from './components/InvitedDashboard';
import styles from './myDashboard.module.scss';
import HttpClient from '@/apis/httpClient';
import { GetServerSidePropsContext } from 'next';
import instance from '@/apis/axios';
import Meta from '@/components/Meta';
import useCurrentUrl from '@/hooks/useCurrentUrl';

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

type MyDashboardProps = {
  invitations: Invitation[];
};

function MyDashboard({ invitations }: MyDashboardProps) {
  const [invitation, setInvitation] = useState<Invitation[]>(invitations);

  return (
    <>
      <Meta title="Taskify | 내 대시보드" url={useCurrentUrl()} />
      <div className={styles.myDashboardPage}>
        <div className={styles.invitedDashboard}>
          <InvitedDashboard
            initialInvitations={invitations}
            invitations={invitation}
            setInvitations={setInvitation}
          />
        </div>
      </div>
    </>
  );
}

MyDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <DashBoardLayout>{page}</DashBoardLayout>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const httpClient = new HttpClient(instance);
    const invitationsData = await httpClient.get<{ invitations: Invitation[] }>(
      '/invitations',
    );

    return {
      props: {
        invitations: invitationsData.invitations,
      },
    };
  } catch (error) {
    return {
      props: {
        invitations: [],
      },
    };
  }
};

export default MyDashboard;
