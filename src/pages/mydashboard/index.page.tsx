import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import React, { ReactElement, useEffect, useState, RefObject } from 'react';
import InvitedDashboard from './components/InvitedDashboard';
import styles from './myDashboard.module.scss';
import HttpClient from '@/apis/httpClient';
import { GetServerSidePropsContext } from 'next';
import instance, { setContext } from '@/apis/axios';
import Meta from '@/components/Meta';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import BackButton from '@/components/Button/BackButton';
import PageButton from '@/components/Button/PageButton';
import NewDashboardModal from '@/components/Modal/NewDashboardModal';
import useSlideAnimation from '@/hooks/useSlideAnimation';

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
  const [isOpenNewDashboardModal, setIsOpenNewDashboardModal] = useState(false);
  const [refElement, isOpen, renderDelayed] = useSlideAnimation(styles.close);

  useEffect(() => {
    setInvitation(invitations);
  }, [invitations]);

  const handleCreateDashboard = () => {
    setIsOpenNewDashboardModal(true);
  };

  return (
    <>
      <Meta title="Taskify | 내 대시보드" url={useCurrentUrl()} />
      <div
        ref={refElement as RefObject<HTMLDivElement>}
        className={`${styles.myDashboardPage} ${isOpen && styles.open}`}
      >
        {renderDelayed && (
          <div className={styles.wrap}>
            <div className={styles.buttonBox}>
              <BackButton />
              <div className={styles.btn}>
                <PageButton onClick={handleCreateDashboard}>
                  새로운 대시보드
                </PageButton>
              </div>
            </div>
            <div className={styles.invitedDashboard}>
              <InvitedDashboard
                invitations={invitation}
                setInvitations={setInvitation}
              />
            </div>
          </div>
        )}
      </div>
      <NewDashboardModal
        showModal={isOpenNewDashboardModal}
        handleClose={() => setIsOpenNewDashboardModal(false)}
      />
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
