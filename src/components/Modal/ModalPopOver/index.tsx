import React, { Dispatch, useEffect, useRef, useState } from 'react';
import styles from './ModalDropdown.module.scss';
import useCloseModal from '@/hooks/useModalClose';
import EditToDoModal from '../EditToDoModal';
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

type ModalDropdownProps = {
  showDropdown: boolean;
  handleDropdownClose: () => void;
  handleDeleteCardClick: () => void;
  cardData: CardList | undefined;
  dashboardId: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleOpen: () => void;
};

function ModalPopOver({
  showDropdown,
  handleDropdownClose,
  handleDeleteCardClick,
  cardData,
  dashboardId,
  setShowModal,
  handleOpen,
}: ModalDropdownProps) {
  const modalRef: any = useRef();
  useCloseModal(showDropdown, handleDropdownClose, modalRef);

  useEffect(() => {
    if (showDropdown) {
      document.body.style.cssText = `overflow: hidden;`;
      return () => {
        document.body.style.cssText = `overflow: scroll;`;
      };
    }
  }, [showDropdown]);

  return (
    <div className={styles.dropdownBox}>
      <div className={styles.dropdownBtns} ref={modalRef}>
        <div className={styles.dropdownBtn} onClick={handleOpen}>
          수정하기
        </div>

        <div className={styles.dropdownBtn} onClick={handleDeleteCardClick}>
          삭제하기
        </div>
      </div>
    </div>
  );
}

export default ModalPopOver;
