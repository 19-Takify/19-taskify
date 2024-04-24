import Image from 'next/image';
import styles from './Profile.module.scss';
import axios from '@/apis/axios';
import { isAxiosError } from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import setToast from '@/utils/setToast';
import { TOAST_TEXT } from '@/constants/toastText';

function Profile() {
  const [userInfo, setUserInfo] = useState({
    nickname: '유저 닉네임 전역 데이터 추가 예정',
    profileImageUrl: '', // 여기 url도 전역 데이터로 초기 값 설정 예정
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      setToast(TOAST_TEXT.error, '10자 이하만 입력 가능합니다!');
      return;
    }

    setUserInfo((prev) => ({
      ...prev,
      nickname: e.target.value,
    }));
  };

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const data = new FormData();
      data.append('image', imageFile);
      const res = await fetch(
        'https://sp-taskify-api.vercel.app/4-19/users/me/image',
        {
          method: 'POST',
          headers: {
            ContentType: 'multipart/form-data',
            Authorization: `Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjk5MiwidGVhbUlkIjoiNC0xOSIsImlhdCI6MTcxMzk0NDQ5MCwiaXNzIjoic3AtdGFza2lmeSJ9.aKsrEU2a61BNejHSa6NwHOBncsV1-6CLrxMdIQlatyI`,
          },
          body: data,
        },
      );
      const result = await res.json();
      setUserInfo((prev) => ({
        ...prev,
        profileImageUrl: result.profileImageUrl,
      }));
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('a');
    e.preventDefault();
    // users/me, POST, userInfo 넘겨주기
  };

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>프로필</h2>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.box}>
          <div className={styles.imageBox}>
            <figure className={styles.plus}>
              <Image
                width="30"
                height="30"
                src="/svgs/file-add.svg"
                alt="파일 추가 플러스 이미지"
              />
            </figure>
            <label
              htmlFor="image"
              className={styles.imageLabel}
              style={{
                background: userInfo.profileImageUrl
                  ? `url(${userInfo.profileImageUrl}) no-repeat center/cover`
                  : '#f5f5f5',
                opacity: userInfo.profileImageUrl ? 0.7 : 1,
              }}
            />
            <input
              id="image"
              className={styles.addImage}
              type="file"
              accept=".png, .jpg, .jpeg"
              value=""
              onChange={handleImageChange}
            />
          </div>
          <div className={styles.inputBox}>
            <div className={styles.emailBox}>
              <label className={styles.label} htmlFor="email">
                이메일
              </label>
              <input
                className={styles.emailInput}
                id="email"
                type="email"
                readOnly
                value="유저 이메일 전역 데이터 추가 예정"
              />
            </div>
            <div className={styles.nicknameBox}>
              <label className={styles.label} htmlFor="nickname">
                닉네임
              </label>
              <input
                className={styles.nicknameInput}
                id="nickname"
                type="text"
                value={userInfo.nickname}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className={styles.button}>
          저장
        </button>
      </form>
    </div>
  );
}

export default Profile;
