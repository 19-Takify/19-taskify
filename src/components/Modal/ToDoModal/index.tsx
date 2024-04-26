import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './ToDOModal.module.scss';
import ProfileIcon from '../../Profile/ProfileIcon';
import ModalPopOver from '../ModalPopOver';
import Modal from '../Modal';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';

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

type Comments = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
};

type CommentList = {
  cursorId: number;
  comments: Comments[];
};

type ModalProps = {
  showModal: boolean;
  handleClose: () => void;
  cardData?: CardList;
  handleDeleteCardClick: () => void;
  dashboardId: number;
};

function ToDoModal({
  showModal,
  handleClose,
  cardData,
  handleDeleteCardClick,
  dashboardId,
}: ModalProps) {
  const httpClient = new HttpClient(instance);
  const [isDropdown, setIsDropdown] = useState(false);
  const [commentData, setCommentData] = useState<CommentList>();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleDropdownOpen = () => {
    setIsDropdown(true);
  };

  const handleDropdownClose = () => {
    setIsDropdown(false);
  };

  const handleCommentSubmit = async () => {
    const text = textAreaRef.current?.value;

    await httpClient.post('/comments', {
      content: text,
      cardId: Number(cardData?.id),
      columnId: cardData?.columnId,
      dashboardId: dashboardId,
    });

    const comment = await httpClient.get<CommentList>(
      `/comments?cardId=${cardData?.id}`,
    );

    setCommentData(comment);
  };

  useEffect(() => {
    const fetchData = async () => {
      const comment = await httpClient.get<CommentList>(
        `/comments?cardId=${cardData?.id}`,
      );
      setCommentData(comment);
    };

    fetchData();
  }, []);

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
              handleDeleteCardClick={handleDeleteCardClick}
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
              <ProfileIcon profile={cardData?.assignee} small />
              <div className={styles.managerName}>
                {cardData?.assignee?.nickname || '담당자 없음'}
              </div>
            </div>
          </div>
          <div>
            <div className={`${styles.manager} ${styles.doneDate}`}>마감일</div>
            <div className={styles.managerName}>
              {cardData?.dueDate || '마감일 없음'}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.content}>
            <div className={styles.text}>
              {cardData?.description || '설명이 없습니다.'}
            </div>
            <div className={styles.img}>
              {cardData?.imageUrl && (
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
                placeholder="댓글 작성하기"
                className={styles.input}
                ref={textAreaRef}
              />
              <button
                className={styles.submit}
                onClick={handleCommentSubmit}
                type="submit"
              >
                입력
              </button>
            </div>
          </div>
          <ul>
            {commentData?.comments.map((comment) => (
              <li key={comment.id} className={styles.comment}>
                <div className={styles.profile}>
                  <ProfileIcon small profile={comment?.author} />
                  <div className={styles.profileName}>
                    {comment?.author.nickname}
                  </div>
                  <div className={styles.createAt}>{comment?.createdAt}</div>
                </div>
                <div className={styles.commentBox}>
                  <div className={styles.commentText}>{comment?.content}</div>
                  <div className={styles.commentBtns}>
                    <button type="button" className={styles.btn}>
                      수정
                    </button>
                    <button type="button" className={styles.btn}>
                      삭제
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}

export default ToDoModal;
