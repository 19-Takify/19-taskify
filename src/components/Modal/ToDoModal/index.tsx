import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './ToDOModal.module.scss';
import ProfileIcon from '../../Profile/ProfileIcon';
import ModalPopOver from '../ModalPopOver';
import Modal from '../Modal';
import CommentsList from '../Comment/CommentList';
import axios from 'axios';

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

type CommentData = {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  updatedAt: string;
  author: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
};

type ModalProps = {
  showModal: boolean;
  handleClose: () => void;
  cardData: CardList;
  commentData: CommentData[];
};

function ToDoModal({
  showModal,
  handleClose,
  cardData,
  commentData,
}: ModalProps) {
  const fetchComments = async () => {
    try {
      const response = await axios.get('/4-19/comments');
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const commentInput = useRef<HTMLTextAreaElement>(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const [comment, setComment] = useState<CommentData>({
    id: 0,
    content: '',
    createdAt: '',
    userId: 0,
    updatedAt: '',
    author: {
      id: 0,
      nickname: '',
      profileImageUrl: '',
    },
  });
  const [comments, setComments] = useState<CommentData[]>(commentData);
  const [editedComment, setEditedComment] = useState<CommentData | null>(null); // 수정된 댓글 데이터를 관리할 상태

  const handleDropdownOpen = () => {
    setIsDropdown(true);
  };

  const handleDropdownClose = () => {
    setIsDropdown(false);
  };

  const createComment = async (content: string) => {
    try {
      const response = await axios.post('/comments', {
        content: content,
        cardId: 5163,
        columnId: 21073,
        dashboardId: 6265,
      });
      if (response.status >= 200 && response.status < 300) {
        console.log('댓글이 성공적으로 생성되었습니다.');
        fetchComments(); // 댓글 목록을 다시 불러옴
      } else {
        console.error('댓글 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateComment = async (id: number, newContent: string) => {
    try {
      const response = await axios.put(`/comments/${id}`, {
        content: newContent,
      });
      if (response.status >= 200 && response.status < 300) {
        console.log('댓글이 성공적으로 수정되었습니다.');
        fetchComments(); // 댓글 목록을 다시 불러옴
      } else {
        console.error('댓글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.content.length < 1) {
      commentInput.current?.focus();
      return;
    }

    createComment(comment.content);
    alert('댓글이 등록되었습니다.');
    setComment({
      ...comment,
      content: '',
    });
  };

  const onDelete = (id: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id),
    );
    fetchComments();
  };

  const onUpdate = (updatedComment: CommentData) => {
    setEditedComment(updatedComment); // 수정된 댓글 데이터를 상태에 업데이트
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
          <CommentsList
            commentDataArray={comments}
            onDelete={onDelete}
            onUpdate={onUpdate} // onUpdate 함수를 CommentList 컴포넌트로 전달합니다.
          />
        </div>
      </div>
    </Modal>
  );
}

export default ToDoModal;
