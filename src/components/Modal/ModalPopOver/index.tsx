import React, { useEffect, useRef } from 'react';
import styles from './ModalDropdown.module.scss';
import useCloseModal from '@/hooks/useModalClose';

type ModalDropdownProps = {
  showDropdown: boolean;
  handleDropdownClose: () => void;
  handleDeleteCardClick: () => void;
};

function ModalPopOver({
  showDropdown,
  handleDropdownClose,
  handleDeleteCardClick,
}: ModalDropdownProps) {
  const modalRef: any = useRef();
  useCloseModal(showDropdown, handleDropdownClose, modalRef);

  useEffect(() => {
    if (showDropdown) {
      document.body.style.cssText = 'overflow: hidden;';
      return () => {
        document.body.style.cssText = '';
      };
    }
  }, [showDropdown]);

  return (
    <div className={styles.dropdownBox}>
      <div className={styles.dropdownBtns} ref={modalRef}>
        <div className={styles.dropdownBtn}>수정하기</div>
        <div className={styles.dropdownBtn} onClick={handleDeleteCardClick}>
          삭제하기
        </div>
      </div>
    </div>
  );
}

export default ModalPopOver;
