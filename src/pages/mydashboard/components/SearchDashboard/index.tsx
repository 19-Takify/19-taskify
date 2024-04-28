import styles from './SearchDashboard.module.scss';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { debounce } from 'lodash';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';

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

type InvitationList = {
  cursorId: number;
  invitations: Invitation[];
};

type SearchDashboardProps = {
  setInvitations: Dispatch<SetStateAction<Invitation[]>>;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
};

function SearchDashboard({
  setInvitations,
  setIsSearch,
}: SearchDashboardProps) {
  const httpClient = new HttpClient(instance);
  const debouncing = debounce(async (value: string) => {
    if (value) {
      const searchInvitations = await httpClient.get<InvitationList>(
        `/invitations?title=${value}`,
      );
      setInvitations(searchInvitations.invitations);
      setIsSearch(true);
      return;
    }

    const searchInvitations =
      await httpClient.get<InvitationList>(`/invitations`);
    setInvitations(searchInvitations.invitations);
    setIsSearch(false);
  }, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      <input
        className={styles.searchInput}
        placeholder="검색"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default SearchDashboard;
