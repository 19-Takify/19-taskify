import useUser from '@/hooks/useUser';

function Card() {
  // user를 사용하기 위해 컴포넌트에서 사용하는 커스텀 훅
  const user = useUser();

  return (
    <>
      <div>Card 컴포넌트</div>
      <div>user_nickname: {user.nickname}</div>
    </>
  );
}

export default Card;
