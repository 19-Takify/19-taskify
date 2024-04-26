import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ToDOModal.module.scss';
import ProfileIcon from '../../Profile/ProfileIcon';
import ModalPopOver from '../ModalPopOver';
import Modal from '../Modal';
import Comment from '../Comment/Comment';

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
  const commentInput = useRef<HTMLTextAreaElement>(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const [comment, setComment] = useState({
    id: 0,
    content: '',
    createdAt: '',
    updatedAt: '',
    cardId: 0,
    author: { id: 0, nickname: '', profileImageUrl: '' },
  });

  const handleDropdownOpen = () => {
    setIsDropdown(true);
  };

  const handleDropdownClose = () => {
    setIsDropdown(false);
  };

  const handleCommentSubmit = () => {
    if (comment.content.length < 1) {
      commentInput.current?.focus();
      return;
    }
    alert('댓글이 등록되었습니다.');
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
              <textarea
                ref={commentInput}
                onChange={(e) =>
                  setComment({ ...comment, content: e.target.value })
                }
                placeholder="댓글 작성하기"
                className={styles.input}
              />
              <button
                onClick={handleCommentSubmit}
                className={styles.submit}
                type="submit"
              >
                입력
              </button>
            </div>
          </div>
          <Comment commentData={commentData} />
        </div>
      </div>
    </Modal>
  );
}

export default ToDoModal;
