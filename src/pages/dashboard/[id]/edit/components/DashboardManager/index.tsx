import Image from 'next/image';
import { useEffect, useState, useRef, ChangeEvent } from 'react';
import styles from './DashboardManager.module.scss';
import axios from '@/apis/axios';
import setToast from '@/utils/setToast';
import { useAtomValue } from 'jotai';
import { selectDashboardAtom } from '@/store/dashboard';
import { TOAST_TEXT } from '@/constants/toastText';
import { TInviteData, TMembersData } from '../../type/editType';

type TDashboardManager = TInviteData[] | TMembersData[];

type TDashboardManagerProps = {
  usage: string;
  data: TInviteData[] | TMembersData[];
};

const MANAGER: any = {
  member: {
    title: '구성원',
    label: '이름',
  },
  invite: {
    title: '초대 내역',
    label: '이메일',
  },
};

// 구성원 삭제 버튼 - 컨펌 모달
function DashboardManager({ usage, data }: TDashboardManagerProps) {
  const selectDashboard = useAtomValue(selectDashboardAtom);
  const [list, setList] = useState<TInviteData[] | TMembersData[]>(data);
  const [searchValue, setSearchValue] = useState<string>('');
  const cacheAllData = useRef<TInviteData[] | TMembersData[]>(data);
  const isInvite = usage === 'invite';

  const handleDelete = async (id: number) => {
    const url = isInvite
      ? `dashboards/${selectDashboard.id}/invitations/${id}`
      : `/members/${id}`;
    try {
      const res = await axios.delete(url);
      if (res.status === 204) {
        const filterData = list.filter((v) => v.id !== id) as TDashboardManager;
        setList(filterData);
      }
    } catch (e: any) {
      setToast(TOAST_TEXT.error, e.response.data.message);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchChange = (value: string): void => {
    if (!searchValue) {
      setList(cacheAllData.current);
      return;
    }
    const lowerSearchValue = value.toLocaleLowerCase();
    const searchResult = cacheAllData.current?.filter(
      (v: any) =>
        v.invitee?.email?.toLowerCase().includes(lowerSearchValue) ||
        v.nickname?.toLowerCase().includes(lowerSearchValue),
    ) as TDashboardManager;
    setList(searchResult);
  };

  useEffect(() => {
    // 디바운싱 적용 0.5초 딜레이
    const timer = setTimeout(() => {
      handleSearchChange(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>{MANAGER[usage].title}</h2>
        {isInvite && (
          <button>
            <Image
              className={styles.plusImg}
              src="/svgs/plus.svg"
              alt="플러스 모양 이미지"
              width="16"
              height="16"
            />
            초대하기
          </button>
        )}
      </div>
      <div className={styles.inputBox}>
        <Image
          src="/svgs/search.svg"
          alt="검색 돋보기 이미지"
          width="21"
          height="20"
        />
        <input
          type="search"
          placeholder={
            isInvite
              ? '초대한 유저의 이메일을 입력해 주세요.'
              : '구성원의 닉네임을 입력해 주세요.'
          }
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>
      <h3>{MANAGER[usage].label}</h3>
      {list?.length > 0 ? (
        <ul>
          {list?.map((v) => {
            return isInvite ? (
              <li key={v.id}>
                <span className={styles.text}>
                  {(v as TInviteData).invitee.email}
                </span>
                <button onClick={() => handleDelete(v.id)}>취소</button>
              </li>
            ) : (
              <li key={v.id}>
                <div className={styles.listBox}>
                  <Image
                    src={
                      (v as TMembersData).profileImageUrl ??
                      '/svgs/default-profile.svg'
                    }
                    className={styles.userProfileImg}
                    alt="유저 프로필 이미지"
                    width={32}
                    height={32}
                    loading="lazy"
                  />
                  <span className={styles.text}>
                    {(v as TMembersData).nickname}
                  </span>
                </div>
                {!(v as TMembersData).isOwner ? (
                  <>
                    {selectDashboard.createdByMe && (
                      <button onClick={() => handleDelete(v.id)}>삭제</button>
                    )}
                  </>
                ) : (
                  <figure className={styles.crown}>
                    <Image
                      src="/svgs/crown.svg"
                      alt="대시보드 주인을 뜻하는 왕관 이미지"
                      width={26}
                      height={22}
                      style={{ height: 22 }}
                    />
                  </figure>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.empty}>
          <Image
            src="/svgs/black-logo.svg"
            alt="taskify 로고 이미지"
            width="105"
            height="130"
            priority
          />
          데이터가 존재하지 않습니다!
        </div>
      )}
    </div>
  );
}

export default DashboardManager;
