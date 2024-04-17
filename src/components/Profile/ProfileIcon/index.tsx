import styles from './ProfileIcon.module.scss';
import Image from 'next/image';

type Profile = {
  profileImageUrl?: string;
  nickname: string;
  id?: number;
};

type ProfileIconProps = {
  children?: React.ReactNode;
  profile?: Profile | null;
  small?: boolean;
};

function ProfileIcon({ children, profile, small = false }: ProfileIconProps) {
  return (
    <div className={`${styles.profileIcon} ${small && styles.small}`}>
      {profile && (
        <Image
          className={styles.profileIconImage}
          src={profile.profileImageUrl || ''}
          alt={`${profile.nickname} 프로필 이미지`}
          width={24}
          height={24}
        />
      )}
      {children}
    </div>
  );
}

export default ProfileIcon;
