import ProfileIcon from '../Profile/ProfileIcon';
import Tag from '../Tag';
import styles from './Card.module.scss';
import Image from 'next/image';

type Assignee = {
  profileImageUrl: string;
  nickname: string;
  id: number;
};

type CardList = {
  id: number;
  title: string;
  description?: string;
  tags?: string[];
  dueDate?: string;
  assignee?: Assignee;
  imageUrl?: string;
  teamId?: string;
  columnId: number;
  createdAt?: string;
  updatedAt?: string;
};

type CardProps = {
  cardData: CardList;
};

function Card({ cardData }: CardProps) {
  return (
    <div className={styles.cardBox}>
      {cardData?.imageUrl && (
        <Image
          className={styles.cardImage}
          src={cardData?.imageUrl}
          alt="카드 배경 이미지"
          width={274}
          height={160}
          priority={true}
        />
      )}
      <div className={styles.desktopBox}>
        <div className={styles.tabletBox}>
          <span>{cardData?.title}</span>
          <div className={styles.tabletContent}>
            <ul className={styles.tags}>
              {cardData?.tags?.map((tag, index) => (
                <li key={index}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
            <div className={styles.bottom}>
              <div className={styles.date}>
                <Image
                  src="/svgs/calendar.svg"
                  alt="달력 아이콘"
                  width={18}
                  height={18}
                />
                <p>{cardData?.dueDate?.split(' ')[0]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileIcon}>
          <ProfileIcon profile={cardData?.assignee} small />
        </div>
      </div>
    </div>
  );
}

export default Card;
