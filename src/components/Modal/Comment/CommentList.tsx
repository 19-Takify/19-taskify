import React, { useState } from 'react';
import Comment from './Comment';

type Author = {
  id: number;
  nickname: string;
  profileImageUrl: string;
};

type CommentList = {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  updatedAt: string;
  author: Author;
};

type CommentsListProps = {
  commentDataArray: CommentList[];
  onDelete: (id: number) => void;
  onUpdate: (updatedComment: CommentList) => void;
};

function CommentsList({
  commentDataArray,
  onDelete,
  onUpdate,
}: CommentsListProps) {
  return (
    <div>
      {commentDataArray.map((comment) => (
        <Comment
          key={comment.id}
          commentData={comment}
          onDelete={onDelete}
          onUpdate={onUpdate} // onUpdate 함수를 Comment 컴포넌트로 전달합니다.
        />
      ))}
    </div>
  );
}

export default CommentsList;
