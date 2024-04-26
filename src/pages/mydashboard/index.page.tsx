import SideMenu from '@/components/SideMenu';
import InvitedDashboard from './components/InvitedDashboard';
import styles from './myDashboard.module.scss';
import { useState } from 'react';
import HttpClient from '@/apis/httpClient';
import DashBoardHeader from '@/components/Header/DashBoard';
import { GetServerSidePropsContext } from 'next';
import instance from '@/apis/axios';

type Inviter = { nickname: string; email: string; id: number };
type Dashboard = { title: string; id: number };
type invitee = { nickname: string; email: string; id: number };

type Invitation = {
  id: number;
  inviter: Inviter;
  teamId: string;
  dashboard: Dashboard;
  invitee: invitee;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

type DashBoard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

type MyDashboardProps = {
  invitations: Invitation[];
  dashboards: DashBoard[];
};

function MyDashboard({ invitations, dashboards }: MyDashboardProps) {
  const [invitation, setInvitation] = useState<Invitation[]>(invitations);

  return (
    <div className={styles.myDashboardPage}>
      <DashBoardHeader />
      <SideMenu dashboards={dashboards} />
      <div className={styles.invitedDashboard}>
        <InvitedDashboard
          initialInvitations={invitations}
          invitations={invitation}
          setInvitations={setInvitation}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const accessToken = context.req.cookies.accessToken;
    const httpClient = new HttpClient(instance);
    const invitationsData = await httpClient.get<{ invitations: Invitation[] }>(
      '/invitations',
      {
        Authorization: `Bearer ${accessToken}`,
      },
    );
    const dashboardsData = await httpClient.get<{
      dashboards: DashBoard[];
    }>('/dashboards?navigationMethod=infiniteScroll', {
      Authorization: `Bearer ${accessToken}`,
    });

    return {
      props: {
        invitations: invitationsData.invitations,
        dashboards: dashboardsData.dashboards,
      },
    };
  } catch (error) {
    return {
      props: {
        invitations: [],
        dashboards: [],
      },
    };
  }
};

export default MyDashboard;
