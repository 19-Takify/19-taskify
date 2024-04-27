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
      <NewDashboardModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
}

export default Bongsong;
