import Image from 'next/image';
import styles from './Profile.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import setToast from '@/utils/setToast';
import { TOAST_TEXT } from '@/constants/toastText';
import axios from '@/apis/axios';
import { useAtom } from 'jotai';
import { userAtom } from '@/store/auth';

type TUserInfo = {
  nickname: string;
  profileImageUrl: string | null;
};

function Profile() {
  const [user, setUser] = useAtom(userAtom);
  const [userInfo, setUserInfo] = useState<TUserInfo>({
    nickname: user.nickname,
    profileImageUrl: user.profileImageUrl,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      setToast(TOAST_TEXT.error, '10자 이하만 입력 가능합니다!');
      return;
    }

    setUserInfo((prev) => ({
      ...prev,
      nickname: e.target.value.trim(),
    }));
  };

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      const data = new FormData();
      data.append('image', imageFile);

      const res = await axios.post('users/me/image', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserInfo((prev) => ({
        ...prev,
        profileImageUrl: res.data.profileImageUrl,
      }));
    }
  };

  const handleDeleteImage = () => {
    setUserInfo((prev) => ({
      ...prev,
      profileImageUrl: '',
    }));
  };

  const updateUserProfile = async (userInfo: TUserInfo) => {
    try {
      const res = await axios.put('users/me', userInfo);
      setUser(res.data);
      setToast(TOAST_TEXT.success, '프로필이 변경되었습니다.');
    } catch (e) {
      setToast(TOAST_TEXT.error, '잠시 후 다시 시도해 주세요');
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo.nickname) {
      setToast(TOAST_TEXT.error, '닉네임을 입력해 주세요.');
      return;
    }
    updateUserProfile(userInfo);
  };

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>프로필</h2>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.box}>
          <div className={styles.imageBox}>
            <figure
              className={styles.plus}
              style={{ top: userInfo.profileImageUrl ? '45%' : '50%' }}
            >
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
                opacity: userInfo.profileImageUrl ? 0.8 : 1,
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
            {userInfo.profileImageUrl && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDeleteImage()}
              >
                사진 삭제
              </button>
            )}
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
                value={user.email}
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
        <button type="submit" className={styles.saveButton}>
          저장
        </button>
      </form>
    </div>
  );
}

export default Profile;
