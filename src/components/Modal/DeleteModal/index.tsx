import React from 'react';
import styles from './DeleteColumnModal.module.scss';
import Modal from '../Modal';
import ModalButton from '@/components/Button/ModalButton';

type DeleteModalProps = {
  showModal: boolean;
  handleClose: () => void;
  deleteColumn: () => void;
};

function DeleteColumnModal({
  showModal,
  handleClose,
  deleteColumn,
}: DeleteModalProps) {
  return (
    <Modal showModal={showModal} handleClose={handleClose}>
      <div className={styles.textbox}>
        <div className={styles.text}>칼럼의 모든 카드가 삭제됩니다.</div>
        <div className={styles.buttonBox}>
          <ModalButton onClick={handleClose}>취소</ModalButton>
          <ModalButton onClick={deleteColumn}>삭제</ModalButton>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteColumnModal;
