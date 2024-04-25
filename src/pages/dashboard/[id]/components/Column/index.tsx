import Card from '@/components/Card';
import styles from './Column.module.scss';
import PageButton from '@/components/Button/PageButton';

type CardData = {
  columnId: number;
  cursorId: number;
  totalCount: number;
  cards: [
    {
      id: number;
      title: string;
      description: string;
      tags: string[];
      dueDate: string;
      assignee: {
        profileImageUrl: string;
        nickname: string;
        id: number;
      };
      imageUrl: string;
      teamId: string;
      columnId: number;
      createdAt: string;
      updatedAt: string;
    },
  ];
};

type ColumnProps = {
  columnData: CardData;
};

function Column({ columnData }: ColumnProps) {
  return (
    <ul className={styles.card}>
      <PageButton>카드</PageButton>
      {columnData.cards.length ? (
        columnData.cards.map((cardData) => (
          <li key={cardData.id}>
            <Card cardData={cardData} />
          </li>
        ))
      ) : (
        <li>없음</li>
      )}
    </ul>
  );
}

export default Column;
