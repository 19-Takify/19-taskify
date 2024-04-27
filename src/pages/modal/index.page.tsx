import EditToDoModal from '@/components/Modal/EditToDoModal';
import React, { MouseEvent, useState } from 'react';

function ModalPage() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  const cardContent = {
    id: 5580,
    title: '김치',
    description: '대한민국 최고 반찬',
    tags: ['총각김치', '배추김치'],
    dueDate: '2024-04-27 18:00',
    assignee: {
      profileImageUrl: null,
      nickname: '국밥',
      id: 3079,
    },
    imageUrl: null,
    teamId: '4-19',
    columnId: 22433,
    createdAt: '2024-04-26T17:29:30.341Z',
    updatedAt: '2024-04-26T17:29:30.341Z',
  };
  return (
    <>
      <button type="button" onClick={handleOpen}>
        모달 열기
      </button>
      <EditToDoModal
        showModal={showModal}
        handleClose={handleClose}
        cardContent={cardContent}
        dashBoardId={6679}
      />
    </>
  );
}

export default ModalPage;
