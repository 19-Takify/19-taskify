import Image from 'next/image';
import styles from './BackButton.module.scss';
import { useRouter } from 'next/router';

function BackButton() {
  const router = useRouter();

  const handleRouteBack = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className={styles.backBtn}
      onClick={() => handleRouteBack()}
    >
      <Image
        width={20}
        height={20}
        src="/svgs/arrow-left.svg"
        alt="좌측 방향 화살표"
      />
      뒤로가기
    </button>
  );
}

export default BackButton;
