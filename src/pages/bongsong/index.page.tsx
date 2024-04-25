import { GetServerSidePropsContext } from 'next';
import { getMe } from '@/utils/auth';
import { setContext } from '@/apis/axios';
import { User } from '@/types/auth';
import Card from './components/Card';
import Box from './components/Box';
import useUserForPage from '@/hooks/useUserForPage';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // axios interceptor에서 cookie를 가져오기 위한 필수 함수 호출
  setContext(context);

  // user 전역 상태 초기값을 넣기 위한 user 객체
  const user = await getMe();

  return {
    props: { user },
  };
}

type BongsongProps = {
  user: User;
};

function Bongsong({ user: initialUser }: BongsongProps) {
  // user를 사용하기 위해 페이지 컴포넌트에서 사용하는 커스텀 훅
  const user = useUserForPage(initialUser);
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
    </>
  );
}

export default Bongsong;
