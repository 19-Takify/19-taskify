import styles from './SearchDashboard.module.scss';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

type Invitation = {
  id: number;
  inviter: { nickname: string; email: string; id: number };
  teamId: string;
  dashboard: { title: string; id: number };
  invitee: { nickname: string; email: string; id: number };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

type SearchDashboardProps = {
  initialInvitations: Invitation[];
  setInvitations: Dispatch<SetStateAction<Invitation[]>>;
};

function SearchDashboard({
  initialInvitations,
  setInvitations,
}: SearchDashboardProps) {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = () => {
    const searchInvitations = initialInvitations.filter(
      (invitation) =>
        invitation.dashboard.title.includes(searchText) ||
        invitation.inviter.nickname.includes(searchText),
    );
    setInvitations(searchInvitations);
  };

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
      return;
    }
  };

  return (
    <div className={styles.searchDashboard}>
      <Image
        className={styles.search}
        src="/svgs/search.svg"
        alt="검색 아이콘"
        width={24}
        height={24}
      />
      <input
        placeholder="검색"
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => handleKeyEnter(e)}
      />
    </div>
  );
}

export default SearchDashboard;
