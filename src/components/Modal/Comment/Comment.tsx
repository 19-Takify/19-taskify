import React, { useState } from 'react';
import styles from './Comment.module.scss';
import ProfileIcon from '@/components/Profile/ProfileIcon';
import axios from 'axios';

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
  onDelete: (id: number) => void;
  onUpdate: (updatedComment: Comment) => void;
};

function Comment({ commentData, onDelete, onUpdate }: CommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(commentData.content);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedContent(commentData.content); // 수정 취소 시 원래 내용으로 되돌리기 위해
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSaveEdit = async () => {
    // 수정된 내용을 서버에 보내고, 수정된 댓글 데이터를 받아옵니다.
    try {
      const response = await axios.put(`/comments/${commentData.id}`, {
        content: editedContent,
      });
      if (response.status >= 200 && response.status < 300) {
        const updatedComment = response.data;
        onUpdate(updatedComment); // 수정된 댓글 데이터를 상위 컴포넌트로 전달합니다.
        setIsEditing(false);
      } else {
        console.error('댓글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.comment}>
        <div className={styles.profile}>
          <ProfileIcon small profile={commentData.author} />
          <div className={styles.profileName}>
            {commentData.author.nickname}
          </div>
          <div className={styles.createAt}>{commentData.createdAt}</div>
        </div>
        <div className={styles.commentBox}>
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={handleEditChange}
              className={styles.editTextArea}
            />
          ) : (
            <div className={styles.commentText}>{commentData.content}</div>
          )}
          <div className={styles.commentBtns}>
            {isEditing ? (
              <>
                <button
                  type="button"
                  className={styles.btnSave}
                  onClick={handleSaveEdit}
                >
                  저장
                </button>
                <button
                  type="button"
                  className={styles.btnCancel}
                  onClick={handleEditToggle}
                >
                  취소
                </button>
              </>
            ) : (
              <button
                type="button"
                className={styles.btn}
                onClick={handleEditToggle}
              >
                수정
              </button>
            )}
            <button
              type="button"
              className={styles.btn}
              onClick={() => onDelete(commentData.id)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
