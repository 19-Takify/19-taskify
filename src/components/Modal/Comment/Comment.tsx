import React, { useState, useRef, useEffect } from 'react';
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [tempContent, setTempContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedContent(tempContent);
      setTempContent('');
    } else {
      setTempContent(editedContent);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSaveEdit = async () => {
    if (isSaving) return; // 이미 저장 중이면 더 이상 진행하지 않음
    setIsSaving(true);
    await onUpdate(commentData?.id, editedContent);
    setIsEditing(!isEditing);
    setIsSaving(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSaveEdit();
    }
  };

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(
        textAreaRef.current.value.length,
        textAreaRef.current.value.length,
      );
    }
  }, [isEditing]);

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
              ref={textAreaRef}
              value={editedContent}
              onChange={handleEditChange}
              className={styles.editTextArea}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div className={styles.commentText}>{commentData?.content}</div>
          )}
          <div className={styles.commentBtns}>
            {isEditing ? (
              <>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={handleSaveEdit}
                >
                  저장
                </button>
                <button
                  type="button"
                  className={styles.btn}
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
