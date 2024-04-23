import { useState, useEffect } from 'react';
import useIsDesiredSize from '@/hooks/useIsDesiredSize';
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
  const isTablet = useIsDesiredSize(744);
  const profileCount = isTablet ? 2 : 4;
  const profileListSlice = profileList.slice(0, profileCount + 1);

  return (
    <ul className={styles.profileIconList}>
      {profileListSlice.map((profile, index) =>
        index === profileCount ? (
          <li key={profile.id}>
            <ProfileIcon>{`+${profileList.length - profileCount}`}</ProfileIcon>
          </li>
        ) : (
          <li key={profile.id}>
            <ProfileIcon profile={profile} />
          </li>
        ),
      )}
    </ul>
  );
}

export default ProfileIconList;
