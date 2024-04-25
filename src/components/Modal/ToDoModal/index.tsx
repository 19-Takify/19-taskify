import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ToDOModal.module.scss';
import ProfileIcon from '../../Profile/ProfileIcon';
import ModalPopOver from '../ModalPopOver';
import Modal from '../Modal';

type Assignee = {
  profileImageUrl: string;
  nickname: string;
  id: number;
};

type CardList = {
  id: number;
  title: string;
  description?: string;
  tags?: string[];
  dueDate?: string;
  assignee?: Assignee;
  imageUrl?: string;
  teamId?: string;
  columnId: number;
  createdAt?: string;
  updatedAt?: string;
};

type Author = {
  id: number;
  nickname: string;
  profileImageUrl: string;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  updatedAt: string;
  author: Author;
};

type ModalProps = {
  showModal: boolean;
  handleClose: () => void;
  cardData: CardList;
  commentData: Comment;
};

function ToDoModal({
  showModal,
  handleClose,
  cardData,
  commentData,
}: ModalProps) {
  const [isDropdown, setIsDropdown] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdown(true);
  };

  const handleDropdownClose = () => {
    setIsDropdown(false);
  };

  return (
    <Modal showModal={showModal} handleClose={handleClose}>
      <div className={styles.btnBox}>
        <div className={styles.btns}>
          <button onClick={handleDropdownOpen} className={styles.btnx}>
            <Image
              src="/svgs/kebab.svg"
              alt="케밥 버튼"
              width={28}
              height={28}
            />
          </button>
          {isDropdown && (
            <ModalPopOver
              showDropdown={isDropdown}
              handleDropdownClose={handleDropdownClose}
            />
          )}
          <button onClick={handleClose} className={styles.btnx}>
            <Image src="/svgs/close.svg" alt="닫기" width={28} height={28} />
          </button>
        </div>
        <div className={styles.name}>새로운 일정 관리 Taskify</div>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.managerBox}>
          <div className={styles.nameBox}>
            <div className={styles.manager}>담당자</div>
            <div className={styles.managerProfile}>
              <ProfileIcon profile={cardData.assignee} small />
              <div className={styles.managerName}>
                {cardData.assignee?.nickname || '담당자 없음'}
              </div>
            </div>
          </div>
          <div>
            <div className={`${styles.manager} ${styles.doneDate}`}>마감일</div>
            <div className={styles.managerName}>
              {cardData.dueDate || '마감일 없음'}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.content}>
            <div className={styles.text}>
              {cardData.description || '설명이 없습니다.'}
            </div>
            <div className={styles.img}>
              {cardData.imageUrl && (
                <Image
                  src="/svgs/example.svg"
                  alt="예시 사진"
                  layout="responsive"
                  width={300}
                  height={300}
                />
              )}
            </div>
            <div>댓글</div>
            <div className={styles.textarea}>
              <textarea placeholder="댓글 작성하기" className={styles.input} />
              <button className={styles.submit} type="submit">
                입력
              </button>
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.profile}>
              <ProfileIcon small profile={commentData.author} />
              <div className={styles.profileName}>
                {commentData.author.nickname}
              </div>
              <div className={styles.createAt}>{commentData.createdAt}</div>
            </div>
            <div className={styles.commentBox}>
              <div className={styles.commentText}>{commentData.content}</div>
              <div className={styles.commentBtns}>
                <button type="button" className={styles.btn}>
                  수정
                </button>
                <button type="button" className={styles.btn}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ToDoModal;
