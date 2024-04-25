import styles from './SearchDashboard.module.scss';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { debounce } from 'lodash';

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
  const debouncing = debounce((value: string) => {
    const searchInvitations = initialInvitations.filter(
      (invitation) =>
        invitation.dashboard.title.includes(value) ||
        invitation.inviter.nickname.includes(value),
    );
    setInvitations(searchInvitations);
  }, 400);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    debouncing(e.target.value);
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
      <input placeholder="검색" onChange={(e) => handleSubmit(e)} />
    </div>
  );
}

export default SearchDashboard;
