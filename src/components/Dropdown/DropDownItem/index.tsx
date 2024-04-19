import Image from 'next/image';
import styles from './DropDownItem.module.scss';

type TData = {
  title?: string;
  nickname?: string;
  profileImageUrl?: string;
};

type TItemProps = {
  usage?: 'state' | 'manager';
  data: TData;
};

function DropDownItem({ usage, data }: TItemProps) {
  const { title, nickname, profileImageUrl } = data;
  const isState = usage === 'state';

  return (
    <div className={styles.wrap}>
      <div className={`${styles.box} ${isState && styles.backEffect}`}>
        {isState ? (
          <>
            <p className={styles.circle} />
            <span className={styles.text}>{title}</span>
          </>
        ) : (
          <>
            <Image
              width={24}
              height={24}
              className={styles.profile}
              src={`${profileImageUrl}`}
              alt="유저 프로필 이미지"
            />
            <span className={styles.nickname}>{nickname}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default DropDownItem;
