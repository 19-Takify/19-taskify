import { GetServerSidePropsContext } from 'next';
import { getMe } from '@/utils/auth';
import { setContext } from '@/apis/axios';
import { User } from '@/types/auth';
import Card from './components/Card';
import useUserForPage from '@/hooks/useUserForPage';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  setContext(context);

  const user = await getMe();

  return {
    props: { user },
  };
}

type BongsongProps = {
  user: User;
};

function Bongsong({ user: initialUser }: BongsongProps) {
  const user = useUserForPage(initialUser);
  return (
    <>
      <div>Bongsong 컴포넌트</div>
      <div>user_id: {user.id}</div>
      <br />
      <hr />
      <br />
      <Card />
    </>
  );
}

export default Bongsong;
