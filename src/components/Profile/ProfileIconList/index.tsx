import { useState, useEffect } from 'react';
import ProfileIcon from '../ProfileIcon';
import styles from './ProfileIconList.module.scss';

type ProfileList = {
  profileImageUrl?: string;
  nickname: string;
  id: number;
};

type ProfileIconListProps = {
  profileList: ProfileList[];
};

function ProfileIconList({ profileList }: ProfileIconListProps) {
  const [isCount, setIsCount] = useState(2);

  console.log(isCount);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 375) {
          setIsCount(4);
          return;
        }
        setIsCount(2);
      }
    };

    // 컴포넌트가 마운트될 때 한 번 실행
    handleResize();

    // 창 크기가 변경될 때마다 실행
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsCount]); // setIsMobile가 의존성 배열에 추가됨

  return (
    <ul className={styles.profileIconList}>
      {profileList.map((profile, index) =>
        index <= isCount ? (
          index === isCount ? (
            <li key={profile.id}>
              <ProfileIcon>{`+${profileList.length - isCount}`}</ProfileIcon>
            </li>
          ) : (
            <li key={profile.id}>
              <ProfileIcon profile={profile} />
            </li>
          )
        ) : null,
      )}
    </ul>
  );
}

export default ProfileIconList;
