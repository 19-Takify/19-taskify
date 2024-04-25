import { useAtom } from 'jotai';
import { userAtom } from '@/store/auth';
import useUser from '@/hooks/useUser';

const nicknames = ['재혁', '송은', '유빈', '승구', '우혁', '봉찬'];

function Box() {
  // 계정 관리 페이지 예시
  const { user, setUser } = useUser();

  return (
    <>
      <div>Box 컴포넌트</div>
      <div>user_nickname: {user.nickname}</div>
      <button
        type="button"
        onClick={() =>
          setUser((pre) => ({
            ...pre,
            nickname: nicknames[Math.floor(Math.random() * nicknames.length)],
          }))
        }
      >
        내 정보 변경
      </button>
    </>
  );
}

export default Box;
