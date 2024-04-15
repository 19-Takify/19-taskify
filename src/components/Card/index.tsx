import styles from './Card.module.scss';
import Image from 'next/image';

function Card() {
  const card = [
    {
      id: 0,
      title: '새로운 작업물',
      description: 'string',
      tags: ['프론트엔드', '백엔드'],
      dueDate: '2024.6.21',
      assignee: {
        profileImageUrl: '/svgs/crown.svg',
        nickname: '홍길동',
        id: 0,
      },
      imageUrl: '',
      teamId: 'string',
      columnId: 0,
      createdAt: '2024-04-15T16:25:50.458Z',
      updatedAt: '2024-04-15T16:25:50.458Z',
    },
  ];

  return (
    <div className={styles.cardBox}>
      {card[0].imageUrl && (
        <Image
          src={card[0].imageUrl}
          alt=" card 배경 이미지"
          width={274}
          height={160}
        />
      )}
      <span>{card[0].title}</span>
      <ul className={styles.tags}>
        {card[0].tags.map((tag, index) => (
          <li key={index}>{tag}</li>
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
          <p>{card[0].dueDate}</p>
        </div>
        <Image
          src={card[0].assignee.profileImageUrl}
          alt={`${card[0].assignee.nickname} 프로필 이미지`}
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}

export default Card;
