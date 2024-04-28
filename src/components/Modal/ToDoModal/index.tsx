import React, { Dispatch, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ToDOModal.module.scss';
import ProfileIcon from '../../Profile/ProfileIcon';
import ModalPopOver from '../ModalPopOver';
import Modal from '../Modal';
import HttpClient from '@/apis/httpClient';
import instance from '@/apis/axios';
import CommentsList from '../Comment/CommentList';
import setToast from '@/utils/setToast';
import { FETCH_ERROR_MESSAGE } from '@/constants/errorMessage';
import { SetStateAction } from 'jotai';

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

type CommentData = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: Author;
};

type CommentList = {
  cursorId: number;
  comments: CommentData[];
};

type ModalProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
  handleOpen: () => void;
  cardData?: CardList;
  handleDeleteCardClick: () => void;
  dashboardId: number;
};

function ToDoModal({
  showModal,
  setShowModal,
  handleClose,
  handleOpen,
  cardData,
  handleDeleteCardClick,
  dashboardId,
}: ModalProps) {
  const httpClient = new HttpClient(instance);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleDropdownOpen = () => {
    setIsDropdown(true);
  };

  const handleDropdownClose = () => {
    setIsDropdown(false);
  };

  const handleCommentSubmit = async () => {
    if (!textAreaRef.current?.value) {
      setToast('error', '😰 댓글을 입력해 주세요.');
      return;
    }

    try {
      await httpClient.post(`/comments`, {
        content: textAreaRef.current?.value,
        cardId: cardData?.id,
        columnId: cardData?.columnId,
        dashboardId: dashboardId,
      });
      setIsEditing((prev) => !prev);

      //입력 버튼 수행 후 입력 값 초기화
      if (textAreaRef.current) {
        textAreaRef.current.value = '';
      }
    } catch {
      setToast('error', '😰 댓글 작성에 실패하였습니다.');
    }
  };

  const handleOnDelete = async (commentId: number) => {
    try {
      commentId && (await httpClient.delete(`/comments/${commentId}`));
      setIsEditing((prev) => !prev);
    } catch {
      setToast('error', '😰 댓글 삭제에 실패했습니다.');
    }
  };

  const handleOnUpdate = async (commentId: number, text: string) => {
    try {
      commentId &&
        (await httpClient.put(`/comments/${commentId}`, {
          content: text,
        }));
      setIsEditing((prev) => !prev);
    } catch {
      setToast('error', '😰 댓글 수정에 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const comment: CommentList = await httpClient.get(
        `/comments?cardId=${cardData?.id}`,
      );
      setCommentData(comment.comments);
    };

    fetchData();
  }, [isEditing]);

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
              cardData={cardData}
              dashboardId={dashboardId}
              setShowModal={setShowModal}
              handleDeleteCardClick={handleDeleteCardClick}
              handleOpen={handleOpen}
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
          <CommentsList
            commentDataArray={commentData}
            onDelete={handleOnDelete}
            onUpdate={handleOnUpdate}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ToDoModal;
