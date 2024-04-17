import ProfileIcon from '../ProfileIcon';
import styles from './ProfileIconList.module.scss';

type ProfileList = {
  profileImageUrl: string;
  nickname: string;
  id: number;
};

type ProfileIconList = {
  profileList: ProfileList[];
};

function ProfileIconList({ profileList }: ProfileIconList) {
  return (
    <ul className={styles.profileIconList}>
      {profileList.map((profile, index) =>
        index < 4 ? (
          <li key={profile.id}>
            <ProfileIcon profile={profile} />
          </li>
        ) : (
          index === 4 && (
            <li key={profile.id}>
              <ProfileIcon>{`+${profileList.length - 4}`}</ProfileIcon>
            </li>
          )
        ),
      )}
    </ul>
  );
}

export default ProfileIconList;
