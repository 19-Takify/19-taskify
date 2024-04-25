import { useAtom } from 'jotai';
import { userAtom } from '@/store/auth';

function Box() {
  // 계정 관리 페이지 예시
  const [user, setUser] = useAtom(userAtom);

  return (
    <>
      <div>Box 컴포넌트</div>
      <div>user_nickname: {user.nickname}</div>
      <button
        type="button"
        onClick={() => setUser((pre) => ({ ...pre, nickname: 'hello' }))}
      >
        내 정보 변경
      </button>
    </>
  );
}

export default Box;
