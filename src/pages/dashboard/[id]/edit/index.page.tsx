import setToast from '@/utils/setToast';
import styles from './style/edit.page.module.scss';
import DashboardManager from '@/pages/dashboard/[id]/edit/components/DashboardManager';
import DashboardEdit from '@/pages/dashboard/[id]/edit/components/DashboardEdit';
import Meta from '@/components/Meta';
import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import { ReactElement, useState, RefObject } from 'react';
import BackButton from '@/components/Button/BackButton';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import axios, { setContext } from '@/apis/axios';
import { GetServerSidePropsContext } from 'next';
import { useAtomValue } from 'jotai';
import { selectDashboardAtom } from '@/store/dashboard';
import { TOAST_TEXT } from '@/constants/toastText';
import { TInviteData, TMembersData } from './type/editType';
import DeleteConfirmModal from '@/components/Modal/DeleteModal';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/constants/pageUrl';
import useSlideAnimation from '@/hooks/useSlideAnimation';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  setContext(context);
  try {
    const checkResponse = await axios.get(`dashboards/${context.query.id}`);

    const membersResponse = await axios.get(
      `members?page=1&size=1000&dashboardId=${context.query.id}`,
    );
    const membersData = membersResponse.data.members;

    let inviteData = '';
    if (checkResponse.data.createdByMe) {
      const inviteResponse = await axios.get(
        `dashboards/${context.query.id}/invitations?page=1&size=1000`,
      );
      inviteData = inviteResponse.data.invitations;
    }
    return {
      props: { inviteData, membersData },
    };
  } catch (error) {
    return {
      props: { inviteData: [], membersData: [] },
    };
  }
}

type TEditProps = {
  inviteData: TInviteData[];
  membersData: TMembersData[];
};

function Edit({ inviteData, membersData }: TEditProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refElement, isOpen, renderDelayed] = useSlideAnimation(styles.close);
  const selectDashboard = useAtomValue(selectDashboardAtom);
  const router = useRouter();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteDashboard = async () => {
    try {
      await axios.delete(`/dashboards/${selectDashboard.id}`);
      setToast(TOAST_TEXT.success, '대시보드가 삭제되었습니다!');
      router.push(PAGE_PATH.MY_DASHBOARD);
    } catch (e: any) {
      setToast(TOAST_TEXT.error, e.response.data.message);
    } finally {
      handleModalClose();
    }
  };

  return (
    <>
      <Meta title="Taskify | 대시보드 수정" url={useCurrentUrl()} />
      <div
        ref={refElement as RefObject<HTMLDivElement>}
        className={`${styles.wrap} ${isOpen && styles.open}`}
      >
        {renderDelayed && (
          <div className={styles.box}>
            <div className={styles.buttonBox}>
              <BackButton />
              {selectDashboard.createdByMe && (
                <button className={styles.deleteBtn} onClick={handleModalOpen}>
                  대시보드 삭제하기
                </button>
              )}
            </div>
            {selectDashboard.createdByMe && <DashboardEdit />}
            <DashboardManager usage="member" data={membersData} />
            {selectDashboard.createdByMe && (
              <DashboardManager usage="invite" data={inviteData} />
            )}
          </div>
        )}
      </div>
      {isModalOpen && (
        <DeleteConfirmModal
          showModal={isModalOpen}
          handleClose={() => handleModalClose()}
          deleteColumn={() => handleDeleteDashboard()}
          message="정말 삭제하시겠습니까?"
        />
      )}
    </>
  );
}

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Edit;
