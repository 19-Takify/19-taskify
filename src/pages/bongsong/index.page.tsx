import Card from './components/Card';
import Box from './components/Box';
import useUser from '@/hooks/useUser';

// 이제 getServerSideProps로 user를 넘겨주지 않아도 됩니다.
function Bongsong() {
  const { user } = useUser();
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
