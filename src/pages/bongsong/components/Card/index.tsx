import useUser from '@/hooks/useUser';

function Card() {
  const user = useUser();

  return (
    <>
      <div>Card 컴포넌트</div>
      <div>user_nickname: {user.nickname}</div>
    </>
  );
}

export default Card;
