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
            <p
              className={styles.profile}
              style={{ backgroundImage: `url(${profileImageUrl})` }}
            />
            <span className={styles.nickname}>{nickname}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default DropDownItem;
