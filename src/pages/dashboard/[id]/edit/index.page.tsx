import Image from 'next/image';
import { useRouter } from 'next/router';
import instance from '@/apis/axios';
import setToast from '@/utils/setToast';
import styles from './style/edit.page.module.scss';
import DashboardManager from '@/pages/dashboard/[id]/edit/components/DashboardManager';
import DashboardEdit from '@/pages/dashboard/[id]/edit/components/DashboardEdit';
import Meta from '@/components/Meta';
import DashBoardLayout from '@/components/Layout/DashBoardLayout';
import { ReactElement } from 'react';

// 대시보드 삭제 버튼 - 대시보드 생성자(전역 상태 관리)한테만 보이게 조건부 렌더링, 컨펌 모달
function Edit() {
  const router = useRouter();

  const handleRouteBack = () => {
    router.back();
  };

  const handleDeleteDashboard = async () => {
    try {
      const res = await instance.delete('/dashboards/대시보드 ID');
    } catch (e: any) {
      setToast('error', e.response.data.message);
    }
  };

  return (
    <>
      <Meta title="Taskify | 대시보드 수정" />
      <div className={styles.wrap}>
        <div className={styles.box}>
          <div className={styles.buttonBox}>
            <button
              className={styles.backBtn}
              onClick={() => handleRouteBack()}
            >
              <Image
                width={20}
                height={20}
                src="/svgs/arrow-left.svg"
                alt="좌측 방향 화살표"
              />
              뒤로가기
            </button>
            {
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteDashboard()}
              >
                대시보드 삭제하기
              </button>
            }
          </div>
          <DashboardEdit />
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
