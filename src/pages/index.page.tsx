import Head from 'next/head';
import Card from '@/components/Card';

export default function Home() {
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
    {
      id: 0,
      title: '새로운 작업물s',
      description: 'string',
      tags: ['프론트엔드s', '백엔드s'],
      dueDate: '2024.6.21',
      assignee: {
        profileImageUrl: '/svgs/add.svg',
        nickname: '홍길동s',
        id: 0,
      },
      imageUrl: '/svgs/calendar.svg',
      teamId: 'string',
      columnId: 0,
      createdAt: '2024-04-15T16:25:50.458Z',
      updatedAt: '2024-04-15T16:25:50.458Z',
    },
  ];

  return (
    <>
      {card.map((cardItem) => (
        <Card key={cardItem.id} cards={cardItem} />
      ))}
      <Head>Taskify</Head>
      <h1>taskify</h1>
    </>
  );
}
