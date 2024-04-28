import React from 'react';
import styles from './DeleteColumnModal.module.scss';
import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton';

type DeleteModalProps = {
  showModal: boolean;
  handleClose: () => void;
  deleteColumn: () => void;
  message: string;
};

function DeleteColumnModal({
  showModal,
  handleClose,
  deleteColumn,
  message,
}: DeleteModalProps) {
  return (
    <Modal showModal={showModal} handleClose={handleClose}>
      <div className={styles.textbox}>
        <div className={styles.text}>{message}</div>
        <div className={styles.buttonBox}>
          <ModalButton onClick={handleClose}>취소</ModalButton>
          <ModalButton onClick={deleteColumn}>삭제</ModalButton>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteColumnModal;
