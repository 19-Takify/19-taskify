import { logout } from '@/utils/auth';

function Bongsong() {
  return (
    <>
      <div>Bongsong</div>
      <button type="button" onClick={() => logout()}>
        redirect
      </button>
    </>
  );
}

export default Bongsong;
