import React from 'react';
import styles from './Comment.module.scss';
import ProfileIcon from '@/components/Profile/ProfileIcon';

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

type CommentProps = {
  commentData: Comment;
};

function Comment({ commentData }: CommentProps) {
  return (
    <div className={styles.comment}>
      <div className={styles.profile}>
        <ProfileIcon small profile={commentData.author} />
        <div className={styles.profileName}>{commentData.author.nickname}</div>
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
  );
}

export default Comment;
