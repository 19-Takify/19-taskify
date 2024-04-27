import setToast from '@/utils/setToast';
import styles from './style/edit.page.module.scss';
import DashboardManager from '@/pages/dashboard/[id]/edit/components/DashboardManager';
import DashboardEdit from '@/pages/dashboard/[id]/edit/components/DashboardEdit';
import Meta from '@/components/Meta';
import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import { ReactElement } from 'react';
import BackButton from '@/components/Button/BackButton';
import useCurrentUrl from '@/hooks/useCurrentUrl';
import axios, { setContext } from '@/apis/axios';
import { GetServerSidePropsContext } from 'next';
import { useAtomValue } from 'jotai';
import { selectDashboardAtom } from '@/store/dashboard';
import { TOAST_TEXT } from '@/constants/toastText';
import { TInviteData, TMembersData } from './type/editType';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  setContext(context);
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
}

type TEditProps = {
  inviteData: TInviteData[];
  membersData: TMembersData[];
};

function Edit({ inviteData, membersData }: TEditProps) {
  const selectDashboard = useAtomValue(selectDashboardAtom);

  const handleDeleteDashboard = async () => {
    // 컨펌 모달 추가 예정
    try {
      await axios.delete(`/dashboards/${selectDashboard.id}`);
      setToast(TOAST_TEXT.success, '대시보드가 삭제되었습니다!');
    } catch (e: any) {
      setToast('error', e.response.data.message);
    }
  };

  return (
    <>
      <Meta title="Taskify | 대시보드 수정" url={useCurrentUrl()} />
      <div className={styles.wrap}>
        <div className={styles.box}>
          <div className={styles.buttonBox}>
            <BackButton />
            {selectDashboard.createdByMe && (
              <button
                className={styles.deleteBtn}
                onClick={handleDeleteDashboard}
              >
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
      </div>
    </>
  );
}

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Edit;
