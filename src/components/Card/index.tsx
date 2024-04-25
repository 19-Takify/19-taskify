import ProfileIcon from '../Profile/ProfileIcon';
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
  imageUrl?: string | undefined;
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
          src={cardData?.imageUrl}
          alt="카드 배경 이미지"
          width={274}
          height={160}
        />
      )}
      <span>{cardData?.title}</span>
      <ul className={styles.tags}>
        {cardData?.tags?.map((tag, index) => <li key={index}>{tag}</li>)}
      </ul>
      <div className={styles.bottom}>
        <div className={styles.date}>
          <Image
            src="/svgs/calendar.svg"
            alt="달력 아이콘"
            width={18}
            height={18}
          />
          <p>{cardData?.dueDate}</p>
        </div>
        <div>
          <ProfileIcon profile={cardData?.assignee || null} small />
        </div>
      </div>
    </div>
  );
}

export default Card;
