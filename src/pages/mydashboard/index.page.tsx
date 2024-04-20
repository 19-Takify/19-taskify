import SideMenu from '@/components/SideMenu';
import InvitedDashboard from './components/InvitedDashboard';
import styles from './myDashboard.module.scss';
import { test } from './components/InvitedDashboard/test';

function MyDashboard() {
  return (
    <div className={styles.myDashboardPage}>
      {/* <Header /> 들어갈 부분 */}
      {/*<SideMenu
        dashboards={[{ id: 2, title: 'test', color: '#000000' }]}
        isOpen
  />*/}
      <div className={styles.invitedDashboard}>
        <InvitedDashboard invitation={test.invitations} />
      </div>
    </div>
  );
}

export default MyDashboard;
