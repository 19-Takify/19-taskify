import SideMenu from '@/components/SideMenu';
import InvitedDashboard from './components/InvitedDashboard';
import styles from './myDashboard.module.scss';
import { useEffect, useState } from 'react';
import HttpClient from '@/apis/httpClient';
import DashBoardHeader from '@/components/Header/DashBoard';

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

type DashBoard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

function MyDashboard() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [dashboards, setDashboards] = useState<DashBoard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const httpClient = new HttpClient();
      const invitationsData = (await httpClient.get('/invitations')) as {
        invitations: Invitation[];
      };
      setInvitations(invitationsData.invitations);

      const dashboardsData = (await httpClient.get(
        '/dashboards?navigationMethod=infiniteScroll',
      )) as {
        dashboards: DashBoard[];
      };
      setDashboards(dashboardsData.dashboards);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.myDashboardPage}>
      <DashBoardHeader />
      <SideMenu dashboards={dashboards} />
      <div className={styles.invitedDashboard}>
        <InvitedDashboard
          invitations={invitations}
          setInvitations={setInvitations}
        />
      </div>
    </div>
  );
}

export default MyDashboard;
