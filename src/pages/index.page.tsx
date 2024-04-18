import ModalButton from '@/components/Button/ModalButton';
import PageButton from '@/components/Button/PageButton';
import ProfileIconList from '@/components/Profile/ProfileIconList';

export default function Home() {
  return (
    <>
      <ProfileIconList
        profileList={[
          { profileImageUrl: '', nickname: '길동', id: 2 },
          { profileImageUrl: '', nickname: '길동', id: 2 },
          { profileImageUrl: '', nickname: '길동', id: 2 },
          { profileImageUrl: '', nickname: '길동', id: 2 },
          { profileImageUrl: '', nickname: '길동', id: 2 },
          { profileImageUrl: '', nickname: '길동', id: 2 },
        ]}
      ></ProfileIconList>
    </>
  );
}
