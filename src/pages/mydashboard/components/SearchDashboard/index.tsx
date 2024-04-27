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
  initialInvitations: Invitation[];
  setInvitations: Dispatch<SetStateAction<Invitation[]>>;
};

function SearchDashboard({
  initialInvitations,
  setInvitations,
}: SearchDashboardProps) {
  const httpClient = new HttpClient(instance);
  const debouncing = debounce(async (value: string) => {
    if (value) {
      const searchInvitations = await httpClient.get<InvitationList>(
        `/invitations?title=${value}`,
      );
      setInvitations(searchInvitations.invitations);
      return;
    }

    setInvitations(initialInvitations);
  }, 300);

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
