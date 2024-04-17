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
  cards: CardList;
};

function Card({ cards }: CardProps) {
  return (
    <div className={styles.cardBox}>
      {cards.imageUrl && (
        <Image
          src={cards.imageUrl}
          alt=" card 배경 이미지"
          width={274}
          height={160}
        />
      )}
      <span>{cards.title}</span>
      <ul className={styles.tags}>
        {cards.tags?.map((tag, index) => <li key={index}>{tag}</li>)}
      </ul>
      <div className={styles.bottom}>
        <div className={styles.date}>
          <Image
            src="/svgs/calendar.svg"
            alt="달력 아이콘"
            width={18}
            height={18}
          />
          <p>{cards.dueDate}</p>
        </div>
        <Image
          className={styles.profileIcon}
          src={cards.assignee?.profileImageUrl || ''}
          alt={`${cards.assignee?.nickname} 프로필 이미지`}
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}

export default Card;
