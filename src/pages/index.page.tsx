import Dropdown from '@/components/Dropdown';

// 임시 데이터
const columns = [
  {
    title: 'To Do',
  },
  {
    title: 'On Progress',
  },
  {
    title: 'Done',
  },
];

const members = [
  {
    nickname: '짱구',
    profileImageUrl:
      'https://i.pinimg.com/564x/c5/5c/76/c55c762ce418abefd071aa7e81c5a213.jpg',
  },
  {
    nickname: '철수',
    profileImageUrl:
      'https://i.pinimg.com/564x/c5/5c/76/c55c762ce418abefd071aa7e81c5a213.jpg',
  },
  {
    nickname: '맹구',
    profileImageUrl:
      'https://i.pinimg.com/564x/c5/5c/76/c55c762ce418abefd071aa7e81c5a213.jpg',
  },
];

const initialData2 = {
  title: 'Done',
};

const initialData1 = {
  nickname: '짱구',
  profileImageUrl:
    'https://i.pinimg.com/564x/c5/5c/76/c55c762ce418abefd071aa7e81c5a213.jpg',
};

export default function Home() {
  return (
    <div
      style={{
        margin: 10,
        display: 'flex',
        gap: 300,
        flexDirection: 'column',
      }}
    >
      <Dropdown usage="state" data={columns} initialData={initialData2} />
      <Dropdown usage="manager" data={members} />
    </div>
  );
}
