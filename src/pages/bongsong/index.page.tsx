import { GetServerSidePropsContext } from 'next';
import { getMe } from '@/utils/auth';
import { setContext } from '@/apis/axios';
import { UserType } from '@/types/auth';
import Card from './components/Card';
import Box from './components/Box';
import useUserForPage from '@/hooks/useUserForPage';
import useUser from '@/hooks/useUser';
import { useState } from 'react';
import NewDashboardModal from '@/components/Modal/NewDashboard';
import PageButton from '@/components/Button/PageButton';
import NewColumnModal from '@/components/Modal/NewColumnModal';
import ManageColumnModal from '@/components/Modal/ManageColumnModal';
import InviteDashBoardModal from '@/components/Modal/InviteDashboardModal';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // axios interceptor에서 cookie를 가져오기 위한 필수 함수 호출
  setContext(context);

  // user 전역 상태 초기값을 넣기 위한 user 객체
  const user = await getMe();

  return {
    props: { user, data: 'example' },
  };
}

type BongsongProps = {
  data: string;
};

function Bongsong({ data }: BongsongProps) {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const handleOpenClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div>Bongsong 페이지 컴포넌트 {data}</div>
      <div>user_id: {user.id}</div>
      <br />
      <hr />
      <br />
      <Card />
      <br />
      <hr />
      <br />
      <Box />
      <PageButton onClick={handleOpenClick}>새로운 대시보드</PageButton>
      <PageButton onClick={() => setShowModal2(true)}>컬럼생성</PageButton>
      <PageButton onClick={() => setShowModal3(true)}>컬럼관리</PageButton>
      <PageButton onClick={() => setShowModal4(true)}>초대하기</PageButton>
      <NewDashboardModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
      <NewColumnModal
        showModal={showModal2}
        handleClose={() => setShowModal2(false)}
        dashboardId={Number(7570)}
      />
      <ManageColumnModal
        showModal={showModal3}
        handleClose={() => setShowModal3(false)}
        columnData={{
          id: 25435,
          title: 'To do',
          teamId: '4-19',
          dashboardId: 7570,
          createdAt: '2024-04-27T09:57:57.687Z',
          updatedAt: '2024-04-27T09:57:57.687Z',
        }}
      />
      <InviteDashBoardModal
        showModal={showModal4}
        handleClose={() => setShowModal4(false)}
        dashboardId={Number(7570)}
      />
    </>
  );
}

export default Bongsong;
