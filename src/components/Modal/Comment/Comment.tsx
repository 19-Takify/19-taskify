import React, { useState } from 'react';
import styles from './Comment.module.scss';
import ProfileIcon from '@/components/Profile/ProfileIcon';
import useUser from '@/hooks/useUser';
import { isDateFormat } from '@/hooks/useDateFormat';

type Author = {
  id: number;
  nickname: string;
  profileImageUrl: string;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  cardId: number;
  updatedAt: string;
  author: Author;
};

type CommentProps = {
  commentData: Comment;
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
};

function Comment({ commentData, onDelete, onUpdate }: CommentProps) {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(commentData?.content);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedContent(''); // 수정 취소 시 원래 내용으로 되돌리기 위해
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSaveEdit = async () => {
    onUpdate(commentData?.id, editedContent);
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <div className={styles.comment}>
        <div className={styles.profile}>
          <ProfileIcon small profile={commentData?.author} />
          <div className={styles.profileName}>
            {commentData?.author.nickname}
          </div>
          <div className={styles.createAt}>
            {isDateFormat(commentData?.createdAt)}
          </div>
        </div>
        <div className={styles.commentBox}>
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={handleEditChange}
              className={styles.editTextArea}
            />
          ) : (
            <div className={styles.commentText}>{commentData?.content}</div>
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
            ) : commentData?.author.id === user.id ? (
              <button
                type="button"
                className={styles.btn}
                onClick={handleEditToggle}
              >
                수정
              </button>
            ) : null}
            {commentData?.author.id === user.id ? (
              <button
                type="button"
                className={styles.btn}
                onClick={() => onDelete(commentData.id)}
              >
                삭제
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
