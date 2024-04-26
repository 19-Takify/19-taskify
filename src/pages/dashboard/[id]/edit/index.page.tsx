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
import { getMe } from '@/utils/auth';
import { useAtomValue } from 'jotai';
import { selectDashboardAtom } from '@/store/dashboard';
import { TOAST_TEXT } from '@/constants/toastText';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  setContext(context);

  const user = await getMe();

  return {
    props: { user },
  };
}

function Edit() {
  const selectDashboard = useAtomValue(selectDashboardAtom);

  const handleDeleteDashboard = async () => {
    // 컨펌 모달 추가 예정
    try {
      const res = await axios.delete(`/dashboards/${selectDashboard.id}`);
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
          <DashboardManager usage="member" />
          <DashboardManager usage="invite" />
        </div>
      </div>
    </>
  );
}

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashBoardLayout>{page}</DashBoardLayout>;
};

export default Edit;
