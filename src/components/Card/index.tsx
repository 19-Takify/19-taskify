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

const TAG_COLORS = [
  '#E99695',
  '#F9D0C4',
  '#FEF2C0',
  '#C2E0C6',
  '#BFDADC',
  '#C5DEF5',
  '#BFD4F2',
  '#D4C5F9',
];

function Card({ cardData }: CardProps) {
  return (
    <div className={styles.cardBox} data-status="item">
      {cardData?.imageUrl && (
        <div className={styles.image}>
          <Image
            className={styles.cardImage}
            src={cardData?.imageUrl}
            alt="카드 배경 이미지"
            width={276}
            height={160}
            priority
          />
        </div>
      )}
      <div className={styles.desktopBox} data-status="item">
        <div className={styles.tabletBox} data-status="item">
          <span className={styles.cardTitle} data-status="item">
            {cardData?.title}
          </span>
          <div className={styles.tabletContent} data-status="item">
            <ul className={styles.tags} data-status="item">
              {cardData?.tags?.slice(0, 2).map((tag, index) => (
                <li className={styles.tagsList} key={index} data-status="item">
                  {/* 문자열 다섯 자리까지만 출력 */}
                  <Tag color={TAG_COLORS[index]}>{tag.slice(0, 5)}</Tag>
                </li>
              ))}
            </ul>
            <div className={styles.bottom} data-status="item">
              <div className={styles.date} data-status="item">
                <Image
                  src="/svgs/calendar.svg"
                  alt="달력 아이콘"
                  width={18}
                  height={18}
                  data-status="item"
                />
                <p data-status="item">{cardData?.dueDate?.split(' ')[0]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileIcon} data-status="item">
          <ProfileIcon profile={cardData?.assignee} small />
        </div>
      </div>
    </div>
  );
}

export default Card;
