import SideMenu from '@/components/SideMenu';
import InvitedDashboard from './components/InvitedDashboard';
import styles from './myDashboard.module.scss';

function MyDashboard() {
  return (
    <div className={styles.myDashboardPage}>
      <SideMenu
        dashboards={[{ id: 2, title: 'test', color: '#000000' }]}
        isOpen
      />
      <div className={styles.invitedDashboard}>
        <InvitedDashboard></InvitedDashboard>
      </div>
    </div>
  );
}

export default MyDashboard;
