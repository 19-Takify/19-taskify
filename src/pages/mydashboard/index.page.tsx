import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement, useEffect, useState } from 'react';
import InvitedDashboard from './components/InvitedDashboard';
import styles from './myDashboard.module.scss';
import HttpClient from '@/apis/httpClient';
import { GetServerSidePropsContext } from 'next';
import instance, { setContext } from '@/apis/axios';
import Meta from '@/components/Meta';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import Loading from '@/components/Loading';
import { useRouterLoading } from '@/hooks/useRouterLoading';
import BackButton from '@/components/Button/BackButton';

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
  const [invitation, setInvitation] = useState<Invitation[]>([]);
  const url = useCurrentUrl();
  const isLoading = useRouterLoading();

  useEffect(() => {
    setInvitation(invitations);
  }, [invitations]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Meta title="Taskify | 내 대시보드" url={url} />
      <div className={styles.myDashboardPage}>
        <div className={styles.backButton}>
          <BackButton />
        </div>
        <div className={styles.invitedDashboard}>
          <InvitedDashboard
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  setContext(context);

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
