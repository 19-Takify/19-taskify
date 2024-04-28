import Card from './components/Card';
import Box from './components/Box';
import useUser from '@/hooks/useUser';
import { useState } from 'react';
import NewDashboardModal from '@/components/Modal/NewDashboardModal';
import PageButton from '@/components/Button/PageButton';
import NewColumnModal from '@/components/Modal/NewColumnModal';
import ManageColumnModal from '@/components/Modal/ManageColumnModal';
import InviteDashBoardModal from '@/components/Modal/InviteDashboardModal';

// 이제 getServerSideProps로 user를 넘겨주지 않아도 됩니다.
function Bongsong() {
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
      <div>Bongsong 페이지 컴포넌트</div>
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
